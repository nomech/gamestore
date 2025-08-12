import React from 'react';
import { Outlet } from 'react-router-dom';

const App = () => {
	return (
		<>
			<header>Navbar</header>
			<main>
				<Outlet />
			</main>
		</>
	);
};

export default App;
