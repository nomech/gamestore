import { useForm } from 'react-hook-form';
import styles from './SignUp.module.css';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import Button from '../../components/Button/Button';

const formSchema = z
	.object({
		profilePicture: z
			.any()
			.transform((val) => (val instanceof FileList ? val[0] : val))
			.superRefine((file) => {
				console.log(file);
			}),
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
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitSuccessful },
	} = useForm<DataValues>({
		resolver: zodResolver(formSchema),
		mode: 'onSubmit',
		reValidateMode: 'onBlur',
	});

	useEffect(() => {
		if (!isSubmitSuccessful) {
			return;
		}
		reset();
	}, [isSubmitSuccessful, reset]);

	const onSubmit = (data: DataValues) => console.log(data);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<h2>Sign-up Form</h2>
			<fieldset>
				<legend>Personal information</legend>
				<input
					type="file"
					id="profilePicture"
					className={styles.formInput}
					accept=".jpg, .jpeg, .png, .webp"
					{...register('profilePicture')}
				/>
				<input
					id="first-name"
					type="text"
					{...register('firstName')}
					placeholder="First Name"
				/>
				{errors.firstName && (
					<span className={styles.error}>{errors.firstName.message}</span>
				)}

				<input
					id="last-name"
					type="text"
					{...register('lastName')}
					placeholder="Last Name"
				/>
				{errors.lastName && <span className={styles.error}>{errors.lastName.message}</span>}

				<input
					id="dob"
					type="date"
					{...register('dateOfBirth')}
					placeholder="Date of birth"
				/>
				{errors.dateOfBirth && (
					<span className={styles.error}>{errors.dateOfBirth.message}</span>
				)}

				<input id="phone" type="tel" {...register('phone')} placeholder="Phone" />
				{errors.phone && <span className={styles.error}>{errors.phone.message}</span>}
			</fieldset>
			<fieldset>
				<legend>Account information</legend>
				<input id="email" type="email" {...register('email')} placeholder="Email" />
				{errors.email && <span className={styles.error}>{errors.email.message}</span>}

				<input
					id="password"
					type="password"
					{...register('password')}
					placeholder="Password"
				/>
				{errors.password && <span className={styles.error}>{errors.password.message}</span>}

				<input
					id="confirm-password"
					type="password"
					{...register('confirmPassword')}
					placeholder="Confirm Password"
				/>
				{errors.confirmPassword && (
					<span className={styles.error}>{errors.confirmPassword.message}</span>
				)}
			</fieldset>
			<Button> Sign up!</Button>
		</form>
	);
};

export default SignUp;
