import React, { useState } from 'react';
import styles from './Navbar.module.css';
import { useAuth } from '../../context/AuthContext';
import { NavLink } from 'react-router-dom';
import { Gamepad2, Menu } from 'lucide-react';

const Navbar = () => {
	const { user } = useAuth();

	const [isOpen, setIsOpen] = useState<boolean>(false);

	const handleOnClickMenu = () => {
		setIsOpen((prev) => !prev);
	};

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
				</div>
				<div className={styles.menuButton} onClick={handleOnClickMenu} aria-label="Menu">
					<h2>Menu</h2>
					<Menu size={38} color="#ffffff" />
					{isOpen && (
						<div className={styles.menu}>
							<div className={styles.menuLinks}>
								<NavLink
									to="/cart"
									className={({ isActive }) => (isActive ? styles.active : '')}
								>
									Cart
								</NavLink>

								<NavLink
									to="/checkout"
									className={({ isActive }) => (isActive ? styles.active : '')}
								>
									Checkout
								</NavLink>
							</div>
							{user && (
								<>
									<div className={styles.menuLinks}>
										<NavLink
											to="/profile"
											className={({ isActive }) =>
												isActive ? styles.active : ''
											}
										>
											Profile
										</NavLink>
									</div>
								</>
							)}
						</div>
					)}
				</div>
			</nav>
		</>
	);
};

export default Navbar;
