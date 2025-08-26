import React, { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import './App.css';

const PARTICLE_COUNT = 500;

const App = () => {
	const particlesRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const container = particlesRef.current;
		if (!container) return;

		// Clear any existing particles
		container.innerHTML = '';

		for (let i = 0; i < PARTICLE_COUNT; i++) {
			const particle = document.createElement('div');
			const particleSize = Math.random() * 3 + 'px';
			particle.className = 'particle';
			particle.style.left = Math.random() * 100 + '%';
			particle.style.top = Math.random() * 100 + '%';
			particle.style.height = particleSize;
			particle.style.width = particleSize;
			particle.style.animationDelay = Math.random() * 6 + 's';
			particle.style.animationDuration = Math.random() * 3 + 3 + 's';
			container.appendChild(particle);
		}
	}, []);

	return (
		<>
			<header>
				<Navbar />
			</header>
			<main>
				<div className="particles" id="particles" ref={particlesRef}></div>
				<Outlet />
			</main>
		</>
	);
};

export default App;
