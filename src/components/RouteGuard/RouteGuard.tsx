import React, { useEffect, type PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

type ProtectedRouteProps = PropsWithChildren;

const RouteGuard = ({ children }: ProtectedRouteProps) => {
	const navigate = useNavigate();
	const auth = useAuth();
	const user = auth?.user;
	const isLoading = auth?.isLoading;

	useEffect(() => {
		if (!isLoading && !user) {
			navigate('/sign-in', { replace: true });
		}
	}, [navigate, user, isLoading]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return children;
};

export default RouteGuard;
