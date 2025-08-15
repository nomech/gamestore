import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const RouteGuard: React.FC = () => {
	const navigate = useNavigate();
	const { user, isLoading } = useAuth();

	useEffect(() => {
		if (isLoading) {
			return;
		}

		if (!user) {
			navigate('/sign-in', { replace: true });
		}
	}, [isLoading, user, navigate]);

	if (isLoading) {
		return <div>Loading…</div>;
	}

	return <Outlet />;
};

export default RouteGuard;
