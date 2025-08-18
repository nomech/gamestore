import styles from './GameList.module.css';
import React, { useEffect, useMemo, useState } from 'react';
import supabase from '../../../supabaseConfig';
import Button from '../../components/Button/Button';
import { formatCurrency } from '../../utils/currency';
import { useNavigate } from 'react-router-dom';

type Games = {
	id: number;
	title: string;
	genre: Genre;
	platform: Platform;
	image_url: string;
	details: string;
	price?: number;
	release_date: string;
};

type Genre = {
	id: number;
	genre: string;
};

type Platform = {
	id: number;
	platform: string;
};

type Filter = {
	platform: number | null;
	genre: number | null;
};

const GameCardSkeleton = () => (
	<div className={styles.gameCard}>
		<div className={styles.cardHeader}>
			<div className={styles.skeletonBadge}></div>
			<div className={styles.skeletonBadge}></div>
		</div>
		<div className={styles.imageContainer}>
			<div className={styles.skeletonImage}></div>
		</div>
		<div className={styles.cardWrapper}>
			<div className={styles.skeletonTitle}></div>
			<div className={styles.skeletonText}></div>
			<div className={styles.skeletonText}></div>
			<div className={styles.skeletonDate}></div>
			<div className={styles.cardFooter}>
				<div className={styles.actionsContainer}>
					<div className={styles.skeletonButton}></div>
				</div>
				<div className={styles.priceContainer}>
					<div className={styles.skeletonPrice}></div>
				</div>
			</div>
		</div>
	</div>
);

const FilterSkeleton = () => (
	<div className={styles.filterContainer}>
		<div className={styles.filterWrapper}>
			<div className={styles.skeletonLabel}></div>
			<div className={styles.skeletonSelect}></div>
		</div>
		<div className={styles.filterWrapper}>
			<div className={styles.skeletonLabel}></div>
			<div className={styles.skeletonSelect}></div>
		</div>
	</div>
);

const GamesList = () => {
	const [genres, setGenres] = useState<Genre[]>([]);
	const [platforms, setPlatforms] = useState<Platform[]>([]);
	const [games, setGames] = useState<Games[]>([]);
	const [filter, setFilter] = useState<Filter>({ platform: 0, genre: 0 });
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const navigate = useNavigate();

	const handleOnChangeFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { value, name } = e.target;
		setFilter((prev) => ({ ...prev, [name]: parseInt(value) }));
	};

	useEffect(() => {
		const fetchData = async () => {
			let { data: game, error: gamesError } = await supabase
				.from('games')
				.select(`*, genre (id, genre), platform (id, platform )`);

			console.log(game);

			setGames(game);

			let { data: genre, error: genreError } = await supabase
				.from('genre')
				.select('id, genre');

			setGenres(genre);

			let { data: platform, error: platformError } = await supabase
				.from('platform')
				.select('id, platform');

			setPlatforms(platform);

			setIsLoading(false);
		};
		fetchData();
	}, []);

	const filteredGames = useMemo(() => {
		return games.filter((game) => {
			const genreMatch =
				!filter.genre || filter.genre === 0 || game.genre.id === filter.genre;
			const platformMatch =
				!filter.platform || filter.platform === 0 || game.platform.id === filter.platform;

			return genreMatch && platformMatch;
		});
	}, [games, filter]);

	const handleOnClickDetails = (id: string) => {
		navigate(`/games/${id}`);
	};

	if (isLoading) {
		return (
			<>
				<FilterSkeleton />
				<div className={styles.gameList}>
					{Array.from({ length: 8 }, (_, index) => (
						<GameCardSkeleton key={index} />
					))}
				</div>
			</>
		);
	}

	return (
		<>
			<div className={styles.filterContainer}>
				<div className={styles.filterWrapper}>
					<label htmlFor="platform">Platform:</label>
					<select
						className={styles.filter}
						name="platform"
						id="platform"
						onChange={(e) => handleOnChangeFilter(e)}
					>
						<option key={0} value={0}>
							All
						</option>
						{platforms.map((platform) => (
							<option key={platform.id} value={platform.id}>
								{platform.platform}
							</option>
						))}
					</select>
				</div>
				<div className={styles.filterWrapper}>
					<label htmlFor="genre">Genre:</label>
					<select
						className={styles.filter}
						name="genre"
						onChange={(e) => handleOnChangeFilter(e)}
					>
						<option key={0} value={0}>
							All
						</option>
						{genres.map((genre) => (
							<option key={genre.id} value={genre.id}>
								{genre.genre}
							</option>
						))}
					</select>
				</div>
			</div>
			<div className={styles.gameList}>
				{filteredGames.map((game) => (
					<div key={game.id} className={styles.gameCard}>
						<div className={styles.cardHeader}>
							<p className={styles.platform}>{game.platform.platform}</p>
							<p className={styles.genre}>{game.genre.genre}</p>
						</div>
						<div className={styles.imageContainer}>
							<img
								className={styles.image}
								src={game.image_url}
								alt="Image of the game"
							/>
						</div>
						<div className={styles.cardWrapper}>
							<h2 className={styles.title}>{game.title}</h2>
							<p className={styles.details}>{game.details}</p>
							<p className={styles.releaseDate}>
								Released: {game.release_date ? game.release_date : 'N/A'}
							</p>
							<div className={styles.cardFooter}>
								<div className={styles.actionsContainer}>
									<Button
										className="detailsButton"
										onClick={() => handleOnClickDetails(game.id)}
									>
										Details
									</Button>
								</div>
								<div className={styles.priceContainer}>
									<p>{game.price ? formatCurrency(game.price) : 'N/A'}</p>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default GamesList;
