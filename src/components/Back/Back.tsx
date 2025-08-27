import styles from './Back.module.css';
import Button from '../Button/Button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Back = () => {
	const navigate = useNavigate();

	const onClickButton = () => {
		navigate(-1);
	};

	return (
		<div className={styles.backContainer}>
			<Button onClick={onClickButton}>
				<ArrowLeft />
			</Button>
		</div>
	);
};

export default Back;
