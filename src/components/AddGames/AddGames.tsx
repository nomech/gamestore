import { collection, addDoc } from 'firebase/firestore';
import { database } from '../../../firebaseConfig';
import Button from '../Button/Button';

interface Game {
	title: string;
}

const AddGames = () => {
	const handleAddGames = async () => {
		try {
			const response = await fetch('/data/games.json');
			const games: Game[] = await response.json();

			for (const game of games) {
				await addDoc(collection(database, 'games'), game);
				console.log(`Added: ${game.title}`);
			}

			console.log('🎉 All games added successfully!');
		} catch (error) {
			console.error('Error adding games:', error);
		}
	};

	return <Button onClick={handleAddGames}>Add Games to Firestore</Button>;
};

export default AddGames;
