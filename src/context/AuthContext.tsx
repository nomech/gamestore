import { useState, useEffect, useContext, createContext, type PropsWithChildren } from 'react';
import supabase from '../../supabaseConfig';
import type { User, Session } from '@supabase/supabase-js';

type AuthProps = PropsWithChildren;

interface AuthContextType {
	session: Session | null;
	user: User | null;
	isLoading: boolean;
	error: string;
	signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProps) => {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [session, setSession] = useState<Session | null>(null);
	const [error, setError] = useState<string>('');

	const signOut = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			setError(error.message);
		} else {
			setUser(null);
			setSession(null);
		}
	};

	useEffect(() => {
		const getSession = async () => {
			try {
				const response = await supabase.auth.getSession();
				const {
					data: { session },
				} = response;

				setSession(session);
				setUser(session?.user ?? null);
				setIsLoading(false);
			} catch (error) {
				console.error('Error fetching session:', error);
				setError(error.message);
			}
		};

		getSession();

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
			setUser(session?.user ?? null);
			setIsLoading(false);
		});

		return () => {
			if (subscription) subscription.unsubscribe();
		};

		console.log(user);
	}, []);

	return (
		<AuthContext value={{ session, user, isLoading, error, signOut }}>{children}</AuthContext>
	);
};

export const useAuth = () => {
	const ctx = useContext(AuthContext);
	if (!ctx) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return ctx;
};
