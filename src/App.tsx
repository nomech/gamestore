import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import { Toaster } from 'react-hot-toast';

const App = () => {
	return (
		<>
			<header>
				<Navbar />
				<Toaster
					position="top-right"
					reverseOrder={false}
					toastOptions={{
						className: '',
						style: {
							border: '1px solid #566675',
							padding: '16px',
							color: '#ffffff',
							backgroundColor: '#24263c',
						},
					}}
				/>
			</header>
			<main>
				<Outlet />
			</main>
		</>
	);
};

export default App;
