import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button/Button';

const Profile = () => {
	const { signOut } = useAuth();

	const handleOnClickSignout = () => {
		signOut();
	};

	return (
		<div>
			<Button onClick={handleOnClickSignout}>Log Out</Button>
		</div>
	);
};

export default Profile;
