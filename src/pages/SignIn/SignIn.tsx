import { useNavigate } from 'react-router-dom';
import supabase from '../../../supabaseConfig';
import Button from '../../components/Button/Button';
import styles from './SignIn.module.css';
import { KeyRound } from 'lucide-react';
import { useState } from 'react';

interface Credentials {
	email: string;
	password: string;
}

const SignIn = () => {
	const [credentials, setCredentials] = useState<Credentials>({ email: '', password: '' });
	const [error, setError] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);

	const navigate = useNavigate();

	async function signInWithEmail(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setLoading(true);
		const { data, error } = await supabase.auth.signInWithPassword({
			email: credentials.email,
			password: credentials.password,
		});

		if (error) {
			setError(error.message || 'Failed to sign in');
			setLoading(false);
			return;
		} else {
			setLoading(false);
			console.log('User signed in:', data.user);
			navigate('/home');
		}
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setCredentials((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<div className={styles.formContainer}>
			<h2 className={styles.formTitle}>Sign In</h2>
			<form className={styles.form} onSubmit={signInWithEmail}>
				<fieldset className={styles.fieldset}>
					<legend className={styles.legend}>Account</legend>
					<div className={styles.inputGroup}>
						<label htmlFor="email">Email</label>
						<input
							type="email"
							id="email"
							name="email"
							className={styles.formInput}
							value={credentials.email}
							onChange={handleInputChange}
							placeholder="Enter your email"
							required
						/>
					</div>
					<div className={styles.inputGroup}>
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							name="password"
							className={styles.formInput}
							value={credentials.password}
							onChange={handleInputChange}
							placeholder="Enter your password"
							required
						/>
					</div>
					{error && <div className={styles.error}>{error}</div>}
					<Button type="submit">
						<KeyRound style={{ marginRight: '0.5rem' }} />
						{loading ? 'Signing in...' : 'Sign in'}
					</Button>
				</fieldset>
			</form>
			<div className={styles.footer}>
				<p>
					Don't have an account? <a href="/sign-up">Sign Up</a>
				</p>
				<p>
					Forgot your password? <a href="/password/forgot">Reset Password</a>
				</p>
			</div>
		</div>
	);
};

export default SignIn;
