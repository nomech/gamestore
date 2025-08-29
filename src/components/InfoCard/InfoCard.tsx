import React from 'react';
import styles from './Infocard.module.css';
import Button from '../../components/Button/Button';
import { formatCurrency } from '../../utils/currency';
import { useCart } from '../../context/cartContext';
import type { Database } from '../../types/supabase';
import toast from 'react-hot-toast';
import { useState } from 'react';
type Game = Database['public']['Tables']['games']['Row'];
type Platform = Database['public']['Tables']['platform']['Row'];
type Genre = Database['public']['Tables']['genre']['Row'];

type GameWithLookups = Game & {
	genre: Genre;
	platform: Platform;
	quantity: number;
	product: Game;
};

type Props = { game: GameWithLookups };

const InfoCard = ({ game }: Props) => {
	const [isDisabled, setIsDisabled] = useState<boolean>(false);
	const { dispatch } = useCart();

	const onClickAddToCart = () => {
		dispatch({ type: 'ADD_TO_CART', payload: game });
		toast(`You have added ${game.title} to your cart `);
		setIsDisabled(true);
		setTimeout(() => {
			setIsDisabled(false);
		}, 2000);
	};

	return (
		<div className={styles.infoCard}>
			<h2>Quick Info</h2>
			<ul className={styles.cardContent}>
				<li className={styles.listItem}>
					<strong className={styles.muted}>Release Date:</strong> {game.release_date}
				</li>
				<li className={styles.listItem}>
					<strong className={styles.muted}>Developer:</strong> {game.developer}
				</li>
				<li className={styles.listItem}>
					<strong className={styles.muted}>Publisher:</strong> {game.publisher}
				</li>
				<li className={styles.listItem}>
					<strong className={styles.muted}>Genre:</strong> {game.genre?.genre}
				</li>
				<li className={styles.listItem}>
					<strong className={styles.muted}>Platform:</strong> {game.platform?.platform}
				</li>
			</ul>
			<div className={styles.priceContainer}>
				{game.price ? formatCurrency(game.price) : 'N/A'}
			</div>
			<Button className="detailsButton" onClick={onClickAddToCart} disabled={isDisabled}>
				{isDisabled ? 'Added to cart!' : 'Add to Cart'}
			</Button>
		</div>
	);
};

export default InfoCard;
