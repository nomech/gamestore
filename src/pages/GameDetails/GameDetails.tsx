import supabase from '../../../supabaseConfig';
import styles from './GameDetails.module.css';
import Back from '../../components/Back/Back';
import HeroSection from '../../components/HeroSection/HeroSection';
import InfoCard from '../../components/InfoCard/InfoCard';
import About from '../../components/About/About';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Database } from '../../types/supabase';
type Game = Database['public']['Tables']['games']['Row'];

const GameDetails = () => {
	const { id } = useParams();
	const [game, setGame] = useState<Game | null>(null);

	useEffect(() => {
		const fetchGameDetails = async () => {
			try {
				const { data, error } = await supabase
					.from('games')
					.select(
						`
				*,
				genre ( id, genre ),
				platform ( id, platform )
			`
					)
					.eq('id', id)
					.single();

				setGame(data ? data : null);
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
					<InfoCard game={game} />
					<About text={game.details ?? ''} />
				</div>
			</div>
		</>
	);
};

export default GameDetails;
