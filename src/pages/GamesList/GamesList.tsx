import React, { useEffect, useMemo, useState } from 'react';
import supabase from '../../../supabaseConfig';

type Games = {
	id: number;
	title: string;
	genre: Genre;
	platform: Platform;
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

const GamesList = () => {
	const [genres, setGenres] = useState<Genre[]>([]);
	const [platforms, setPlatforms] = useState<Platform[]>([]);
	const [games, setGames] = useState<Games[]>([]);
	const [filter, setFilter] = useState<Filter>({ platform: 0, genre: 0 });

	const handleOnChangeFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { value, name } = e.target;
		setFilter((prev) => ({ ...prev, [name]: parseInt(value) }));
	};

	useEffect(() => {
		const fetchData = async () => {
			let { data: game, error: gamesError } = await supabase
				.from('games')
				.select(`*, genre (id, genre), platform (id, platform )`);

			setGames(game);

			let { data: genre, error: genreError } = await supabase
				.from('genre')
				.select('id, genre');

			setGenres(genre);

			let { data: platform, error: platformError } = await supabase
				.from('platform')
				.select('id, platform');

			setPlatforms(platform);

			/* 			console.log('Games:', game);
			console.log('Genres', genre);
			console.log('Platform', platform); */
		};
		fetchData();
	}, []);

	const filteredGames = useMemo(() => {
		return games.filter((game) => {
			const genreMatch =
				!filter.genre || filter.genre === 0 || game.genre.id === filter.genre;
			const platformMatch =
				!filter.genre || filter.genre === 0 || game.platform.id === filter.platform;

			return genreMatch && platformMatch;
		});
	}, [games, filter]);

	return (
		<>
			<div>
				<select name="genre" onChange={(e) => handleOnChangeFilter(e)}>
					<option key={0} value={0}>
						All
					</option>
					{genres.map((genre) => (
						<option key={genre.id} value={genre.id}>
							{genre.genre}
						</option>
					))}
				</select>

				<select name="platform" id="platform" onChange={(e) => handleOnChangeFilter(e)}>
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
			<div>{filteredGames.map((game) => game.title)}</div>
		</>
	);
};

export default GamesList;
