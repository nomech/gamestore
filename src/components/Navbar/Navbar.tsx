import { useState, useEffect, useRef } from 'react';
import styles from './Navbar.module.css';
import { useAuth } from '../../context/AuthContext';
import { NavLink } from 'react-router-dom';
import { Gamepad2, Menu } from 'lucide-react';

const Navbar = () => {
	const { user } = useAuth();

	const menuConfig = [
		{ id: 1, to: '/cart', label: 'Cart' },
		{ id: 2, to: '/profile', label: 'Profile', requiresAuth: true },
		{ id: 3, to: '/sign-in', label: 'Sign in', requiresAuth: false },
		{ id: 4, to: '/orders', label: 'Orders', requiresAuth: true },
	];

	const menuItems = menuConfig.filter((item) => {
		if (item.hasOwnProperty('requiresAuth')) {
			return item?.requiresAuth === Boolean(user);
		} else {
			return item;
		}
	});

	return (
		<>
			<nav className={styles.navbar}>
				<div className={styles.navLinks}>
					<Gamepad2 size={48} color="#66ff00" />
					<NavLink to="/" className={({ isActive }) => (isActive ? styles.active : '')}>
						Home
					</NavLink>
					<NavLink
						to="/games"
						className={({ isActive }) => (isActive ? styles.active : '')}
					>
						Games
					</NavLink>

					{menuItems.map((item) => {
						return (
							<div className={styles.navLinks} key={item.id}>
								<NavLink
									to={item.to}
									className={({ isActive }) => (isActive ? styles.active : '')}
								>
									{item.label}
								</NavLink>
							</div>
						);
					})}
				</div>
			</nav>
		</>
	);
};

export default Navbar;
