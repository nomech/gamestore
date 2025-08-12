import styles from './Home.module.css';
import { Link } from 'react-router-dom';

const Home = () => {
	return (
		<section className={styles.hero}>
			<header className={styles.headerContent}>
				<h1 className={styles.heroTitle}>Welcome to GameStore</h1>
				<p className={styles.heroSubtitle}>Find your next favorite game</p>
			</header>
			<Link to="/games" className={styles.ctaLink} aria-label="Browse available games">
				Browse Games
			</Link>
		</section>
	);
};

export default Home;
