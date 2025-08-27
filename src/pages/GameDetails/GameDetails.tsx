import supabase from '../../../supabaseConfig';
import styles from './GameDetails.module.css';
import Button from '../../components/Button/Button';
import Back from '../../components/Back/Back';
import HeroSection from '../../components/HeroSection/HeroSection';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { formatCurrency } from '../../utils/currency';
import { useCart } from '../../context/cartContext';
import type { Database } from '../../types/supabase';
type Game = Database['public']['Tables']['games']['Row'];

const GameDetails = () => {
	const { id } = useParams();
	const [game, setGame] = useState<Game | null>(null);

	const { dispatch } = useCart();

	useEffect(() => {
		const fetchGameDetails = async () => {
			try {
				let { data: game, error } = await supabase
					.from('games')
					.select('*, genre (id, genre), platform (id, platform )')
					.eq('id', id);
				setGame(game ? game[0] : null);
			} catch (error) {
				console.log(error);
			}
		};
		fetchGameDetails();
	}, [id]);

	if (!game) {
		return <div className={styles.gameCard}>Loading...</div>;
	}

	console.log(game);

	return (
		<>
			<Back />
			<div className={styles.gamesContainer}>
				<h1>{game.title}</h1>
				<div className={styles.centerContainer}>
					{game.image_url && (
						<HeroSection
							imageUrl={game.banner_url}
							logoUrl={game.logo_url}
							alt={`Hero section for ${game.title}`}
						/>
					)}
					<div className={styles.gameCard}>
						<ul className={styles.cardContent}>
							<li className={styles.listItem}>
								<strong>Release Date:</strong> {game.release_date}
							</li>
							<li className={styles.listItem}>
								<strong>Genre:</strong> {game.genre?.genre}
							</li>
							<li className={styles.listItem}>
								<strong>Platform:</strong> {game.platform?.platform}
							</li>
							<li className={styles.listItem}>
								<strong>Price:</strong>{' '}
								{game.price ? formatCurrency(game.price) : 'N/A'}
							</li>
							<Button
								className="detailsButton"
								onClick={() => dispatch({ type: 'ADD_TO_CART', payload: game })}
							>
								Add to Cart
							</Button>
						</ul>
					</div>
					<div className={styles.gameCard}>
						<h3>About this game</h3>
						<p>{game.details}</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default GameDetails;
