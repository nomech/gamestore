import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import supabase from '../../../supabaseConfig';
import Button from '../../components/Button/Button';

const VerifyEmail = () => {
	const [errors, setErrors] = useState<string | null>(null);
	const [disabled, setDisabled] = useState<boolean>(false);

	const location = useLocation();
	const email = location.state?.email;

	const handleOnClick = async () => {
		const { error } = await supabase.auth.resend({
			type: 'signup',
			email: email,
		});

		if (error) {
			setErrors(error?.message || 'An error occurred while resending the verification email');
		}

		setDisabled(true);
	};

	useEffect(() => {
		const timeOut = setTimeout(() => {
			setDisabled(false);
		}, 120000);

		return () => clearTimeout(timeOut);
	}, [setDisabled]);

	useEffect(() => {
		if (!errors) return;
		const timer = setTimeout(() => {
			setErrors(null);
		}, 20000);
		return () => clearTimeout(timer);
	}, [errors]);

	return (
		<div>
			<h2>Verify Your Email</h2>

			{email ? (
				<>
					<p>
						A verification link has been sent to <strong>{email}</strong>. Please check
						your inbox to verify your email address.
					</p>
					<Button onClick={handleOnClick} disabled={disabled}>
						Resend Verification Email
					</Button>
				</>
			) : (
				<p>No email address found. Please sign up again.</p>
			)}

			{disabled && (
				<p>Please wait 2 minutes before resending the verification email again.</p>
			)}

			{errors && <p>{errors}</p>}
		</div>
	);
};

export default VerifyEmail;
