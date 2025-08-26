import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../../../supabaseConfig';
import styles from './GameDetails.module.css';
import { formatCurrency } from '../../utils/currency';
import Button from '../../components/Button/Button';
import buttonStyles from '../../components/Button/Button.module.css';
import { useCart } from '../../context/cartContext';


const GameDetails = () => {
	const { id } = useParams();
	const [game, setGame] = useState<any>(null);

	console.log(game);

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
	

	return (
		<div className={styles.centerContainer}>
			<div className={styles.gameCard}>
				{game.image_url && (
					<img src={game.image_url} alt={game.title} className={styles.image} />
				)}
				<div className={styles.cardContent}>
					<h2 className={styles.title}>{game.title}</h2>
					<p>
						<strong>Genre:</strong> {game.genre?.genre}
					</p>
					<p>
						<strong>Platform:</strong> {game.platform?.platform}
					</p>
					<p>
						<strong>Release Date:</strong> {game.release_date}
					</p>
					<p>
						<strong>Price:</strong> {game.price ? formatCurrency(game.price) : 'N/A'}
					</p>
					<p>{game.details}</p>
					<Button
						className="detailsButton"
						onClick={() => dispatch({ type: 'ADD_TO_CART', payload: game })}
					>
						Add to Cart
					</Button>
				</div>
			</div>
		</div>
	);
};

export default GameDetails;
