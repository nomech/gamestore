import { useState, useEffect, useContext, createContext } from 'react';
import supabase from '../../supabaseConfig';
import type { User, Session } from '@supabase/supabase-js';

interface AuthProps {
	children: React.ReactNode;
}

interface AuthContextType {
	session: Session;
	user: User;
	isLoading: boolean;
	error: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProps) => {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [session, setSession] = useState<string>('');
	const [error, setError] = useState<string>('');

	useEffect(() => {
		const getSession = async () => {
			try {
				const response = await supabase.auth.getSession();
				const {
					data: { session },
				} = response;

				setSession(session);
				setUser(session?.user);
				setIsLoading(false);
			} catch (error) {
				console.error('Error fetching session:', error);
				setError(error);
			}
		};

		getSession();

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
			setUser(session?.user);
			setIsLoading(false);
		});

		return () => {
			if (subscription) subscription.unsubscribe();
		};
	}, []);

	return <AuthContext value={{ session, user, isLoading, error }}>{children}</AuthContext>;
};

export const useAuth = () => useContext(AuthContext);
