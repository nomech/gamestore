import styles from './Home.module.css';
import { Link } from 'react-router-dom';

const Home = () => {
	return (
		<main className={styles.heroBg}>
			<section className={styles.heroContent}>
				<h1 className={styles.title}>Welcome to GameStore</h1>{' '}
				<p className={styles.subtitle}>
					Discover, collect, and play the best games. Your next adventure starts here!
				</p>
				<Link to="/games" className={styles.cta} aria-label="Browse available games">
					Browse Games
				</Link>
			</section>
			<div className={styles.bgDecor}></div>
		</main>
	);
};

export default Home;
