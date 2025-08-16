import { useEffect, useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import supabase from '../../../supabaseConfig';
import styles from './ResetPassword.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const passwordSchema = z
	.object({
		password: z.string().min(6, {
			message: 'Password must be at least 6 characters.',
		}),
		passwordConfirmation: z.string().min(6, {
			message: 'Password must be at least 6 characters.',
		}),
	})
	.refine((data) => data.password === data.passwordConfirmation, {
		message: "Passwords don't match.",
		path: ['passwordConfirmation'],
	});

const ResetPassword = () => {
	const [error, setError] = useState<string | undefined>(undefined);

	const { user } = useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: zodResolver(passwordSchema),
		defaultValues: { password: '', passwordConfirmation: '' },
	});

	const navigate = useNavigate();

	const getFieldError = (field: 'password' | 'passwordConfirmation') => {
		return errors[field]?.message as string | undefined;
	};

	const onSubmit = async (data: { password: string; passwordConfirmation: string }) => {
		const { data: supaData, error: supaError } = await supabase.auth.updateUser({
			password: data.password,
		});
		if (supaError) {
			setError(supaError.message);
			return;
		}
		if (supaData) {
			alert('Password updated successfully!');
			reset();
		}
	};

	useEffect(() => {
		if (!user) {
			navigate('/sign-in');
		}
	}, [user, reset]);

	return (
		<div className={styles.formContainer}>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<legend className={styles.legend}>Set new password</legend>
				<fieldset className={styles.fieldset}>
					<input
						type="password"
						placeholder="Enter new password"
						{...register('password')}
						className={styles.formInput}
					/>
					{getFieldError('password') && (
						<div className={styles.errorMessage}>{getFieldError('password')}</div>
					)}

					<div className={styles.inputGroup}>
						<input
							type="password"
							placeholder="Confirm password"
							{...register('passwordConfirmation')}
							className={styles.formInput}
						/>
						{getFieldError('passwordConfirmation') && (
							<div className={styles.errorMessage}>
								{getFieldError('passwordConfirmation')}
							</div>
						)}
					</div>
					{error && <div className={styles.errorMessage}>{error}</div>}
				</fieldset>
				<button type="submit" className={styles.submitButton}>
					Set new password
				</button>
			</form>
		</div>
	);
};

export default ResetPassword;
