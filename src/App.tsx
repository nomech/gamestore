import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import './App.css';

const App = () => {
	return (
		<>
			<header>
				<Navbar />
			</header>
			<main>
				<Outlet />
			</main>
		</>
	);
};

export default App;
