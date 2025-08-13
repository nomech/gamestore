import { useForm } from 'react-hook-form';
import styles from './SignUp.module.css';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { ErrorMessage } from '@hookform/error-message';
import UploadPicture from '../../components/UploadPicture/UploadPicture';
import supabase from '../../../supabaseConfig';

const formSchema = z
	.object({
		firstName: z
			.string()
			.trim()
			.min(1, 'First name is required')
			.max(50, 'First name must be at most 50 characters'),
		lastName: z
			.string()
			.trim()
			.min(1, 'Last name is required')
			.max(50, 'Last name must be at most 50 characters'),
		dateOfBirth: z.string().refine((val) => {
			const date = new Date(val);
			const now = new Date();
			const minYear = now.getFullYear() - 120;
			return !isNaN(date.getTime()) && date < now && date.getFullYear() > minYear;
		}, 'Invalid or unrealistic date of birth'),
		email: z.email().trim().toLowerCase().max(254, 'Email is too long'),
		phone: z
			.string()
			.trim()
			.regex(/^\+?[0-9]{7,15}$/, 'Phone number must be 7-15 digits, can start with +'),
		password: z
			.string()
			.trim()
			.min(8, 'Password must be at least 8 characters')
			.max(100, 'Password must be at most 100 characters')
			.regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
			.regex(/[a-z]/, 'Password must contain at least one lowercase letter')
			.regex(/[0-9]/, 'Password must contain at least one digit')
			.regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
		confirmPassword: z.string().trim(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	});

type DataValues = z.infer<typeof formSchema>;

const SignUp = () => {
	const [disabled, setDisabled] = useState<boolean>(false);
	const [error, setError] = useState<string>('');

	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitSuccessful, isSubmitting },
	} = useForm<DataValues>({
		resolver: zodResolver(formSchema),
		mode: 'onSubmit',
		reValidateMode: 'onBlur',
		disabled,
	});

	useEffect(() => {
		if (!isSubmitSuccessful) {
			return;
		}
		reset();
	}, [isSubmitSuccessful, reset]);

	useEffect(() => {
		setDisabled(isSubmitting);
	}, [isSubmitting]);

	const onSubmit = async (data: DataValues) => {
		// Handles user sign-up with email and password
		const signUpUserWithEmail = async (data: DataValues) => {
			try {
				const response = await supabase.auth.signUp({
					email: data.email,
					password: data.password,
					options: {
						data: {
							first_name: data.firstName,
							last_name: data.lastName,
							phone: data.phone,
							date_of_birth: data.dateOfBirth,
						},
					},
				});

				if (response.data.user) {
					console.log('User signed up successfully');
					navigate('/verify-email');
				}
			} catch (error: any) {
				console.error('Error signing up user:', error);
				if (error?.message) {
					setError(error.message);
				} else if (error?.error_description) {
					setError(error.error_description);
				} else if (error?.status === 400 && error?.data?.msg) {
					setError(error.data.msg);
				} else {
					setError('Error signing up user');
				}
			}
		};

		await signUpUserWithEmail(data);
	};

	return (
		<div className={styles.formContainer}>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<h2>Sign-up Form</h2>
				<fieldset className={styles.fieldset}>
					<legend className={styles.legend}>Personal information</legend>
					<UploadPicture isSubmitSuccessful={isSubmitSuccessful} />
					<div className={styles.inputGroup}>
						<input
							id="first-name"
							type="text"
							className={styles.formInput}
							{...register('firstName')}
							placeholder="First Name"
							disabled={isSubmitting}
						/>

						{errors && (
							<ErrorMessage
								errors={errors}
								name="firstName"
								render={({ message }) => (
									<span className={styles.error}>{message}</span>
								)}
							/>
						)}
					</div>

					<div className={styles.inputGroup}>
						<input
							id="last-name"
							type="text"
							className={styles.formInput}
							{...register('lastName')}
							placeholder="Last Name"
							disabled={isSubmitting}
						/>
						{errors && (
							<ErrorMessage
								errors={errors}
								name="lastName"
								render={({ message }) => (
									<span className={styles.error}>{message}</span>
								)}
							/>
						)}
					</div>

					<div className={styles.inputGroup}>
						<input
							id="dob"
							type="date"
							className={styles.formInput}
							{...register('dateOfBirth')}
							placeholder="Date of birth"
							disabled={isSubmitting}
						/>
						{errors && (
							<ErrorMessage
								errors={errors}
								name="dateOfBirth"
								render={({ message }) => (
									<span className={styles.error}>{message}</span>
								)}
							/>
						)}
					</div>

					<div className={styles.inputGroup}>
						<input
							id="phone"
							type="tel"
							className={styles.formInput}
							{...register('phone')}
							placeholder="Phone"
							disabled={isSubmitting}
						/>
						{errors && (
							<ErrorMessage
								errors={errors}
								name="phone"
								render={({ message }) => (
									<span className={styles.error}>{message}</span>
								)}
							/>
						)}
					</div>
				</fieldset>

				<fieldset className={styles.fieldset}>
					<legend className={styles.legend}>Account information</legend>
					<div className={styles.inputGroup}>
						<input
							id="email"
							type="email"
							className={styles.formInput}
							{...register('email')}
							placeholder="Email"
							disabled={isSubmitting}
						/>
						{errors && (
							<ErrorMessage
								errors={errors}
								name="email"
								render={({ message }) => (
									<span className={styles.error}>{message}</span>
								)}
							/>
						)}
					</div>

					<div className={styles.inputGroup}>
						<input
							id="password"
							type="password"
							className={styles.formInput}
							{...register('password')}
							placeholder="Password"
							disabled={isSubmitting}
						/>
						{errors && (
							<ErrorMessage
								errors={errors}
								name="password"
								render={({ message }) => (
									<span className={styles.error}>{message}</span>
								)}
							/>
						)}
					</div>

					<div className={styles.inputGroup}>
						<input
							id="confirm-password"
							type="password"
							className={styles.formInput}
							{...register('confirmPassword')}
							placeholder="Confirm Password"
							disabled={isSubmitting}
						/>
						{errors && (
							<ErrorMessage
								errors={errors}
								name="confirmPassword"
								render={({ message }) => (
									<span className={styles.error}>{message}</span>
								)}
							/>
						)}
					</div>
				</fieldset>
				<Button className="submitButton">
					{isSubmitting ? 'Signing up...' : 'Sign up!'}
				</Button>
			</form>
			{error && <div className={styles.errorMessage}>{error}</div>}
			{isSubmitSuccessful && <div className={styles.successMessage}>Sign up successful!</div>}
		</div>
	);
};

export default SignUp;
