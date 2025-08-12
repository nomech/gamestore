import styles from './Button.module.css';

interface ButtonProps {
	children?: React.ReactNode;
	onClick?: () => void;
	className?: string;
	disabled?: boolean;
	ariaLabel?: string;
	type?: 'button' | 'submit' | 'reset';
}

const Button = ({
	children = 'Click',
	onClick,
	className,
	disabled = false,
	ariaLabel,
	type,
}: ButtonProps) => {
	return (
		<button
			className={`${styles.button} ${className}`}
			disabled={disabled}
			onClick={onClick}
			aria-label={ariaLabel}
			type={type}
		>
			{children}
		</button>
	);
};

export default Button;
