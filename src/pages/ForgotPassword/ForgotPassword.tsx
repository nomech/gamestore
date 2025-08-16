import React, { useEffect, useState } from 'react';
import supabase from '../../../supabaseConfig';
import styles from './ForgotPassword.module.css';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
	const [email, setEmail] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const navigate = useNavigate();

	const handleOnClickResetPassword = async () => {
		const { data, error } = await supabase.auth.resetPasswordForEmail(email);
		setIsLoading(true);

		if (error) {
			console.log(error);
		}

		if (data) {
			console.log(data);
			setIsLoading(false);
			navigate('/sign-in');
		}
	};

	const handleOnChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	return (
		<div className={styles.formContainer}>
			<form className={styles.form}>
				<legend className={styles.legend}>Forgot Password</legend>

				<fieldset className={styles.fieldset}>
					<div className={styles.inputGroup}>
						<input
							type="email"
							placeholder="Enter your email"
							value={email}
							onChange={handleOnChangeEmail}
							className={styles.formInput}
						/>
					</div>
				</fieldset>

				<button
					type="button"
					onClick={handleOnClickResetPassword}
					className={styles.submitButton}
				>
					{isLoading ? 'Sending Reset Link...' : 'Send Reset Link'}
				</button>
			</form>
		</div>
	);
};

export default ForgotPassword;
