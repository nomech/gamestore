import { useState, useEffect, useRef } from 'react';
import styles from './Navbar.module.css';
import { useAuth } from '../../context/AuthContext';
import { NavLink } from 'react-router-dom';
import { Gamepad2, Menu } from 'lucide-react';

const Navbar = () => {
	const { user } = useAuth();

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const menuRef = useRef<HTMLDivElement | null>(null);

	const handleOnClickMenu = () => {
		setIsOpen((prev) => !prev);
	};

	const menuConfig = [
		{ id: 1, to: '/cart', label: 'Cart' },
		{ id: 2, to: '/checkout', label: 'Checkout' },
		{ id: 3, to: '/profile', label: 'Profile', requiresAuth: true },
		{ id: 4, to: '/sign-in', label: 'Sign in', requiresAuth: false },
	];

	const menuItems = menuConfig.filter((item) => {
		if (item.hasOwnProperty('requiresAuth')) {
			return item?.requiresAuth === Boolean(user);
		} else {
			return item;
		}
	});

	useEffect(() => {
		if (!isOpen) return;

		const onClickOutside = (e: MouseEvent) => {
			if (!menuRef.current) {
				return;
			}

			if (!menuRef.current.contains(e.target as Node)) {
				setIsOpen(false);
			}
		};

		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setIsOpen(false);
		};

		document.addEventListener('mousedown', onClickOutside);
		document.addEventListener('keydown', onKeyDown);
		return () => {
			document.removeEventListener('mousedown', onClickOutside);
			document.removeEventListener('keydown', onKeyDown);
		};
	}, [isOpen]);

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

				<div className={styles.menuButton} onClick={handleOnClickMenu} aria-label="Menu">
					<h2>Menu</h2>
					<Menu size={38} color="#ffffff" />
					{isOpen && (
						<div className={styles.menu} ref={menuRef}>
							<div className={styles.menuLinks}>
								{menuItems.map((item) => {
									return (
										<div className={styles.menuLink} key={item.id}>
											<NavLink
												to={item.to}
												className={({ isActive }) =>
													isActive ? styles.active : ''
												}
											>
												{item.label}
											</NavLink>
										</div>
									);
								})}
							</div>
						</div>
					)}
				</div>
			</nav>
		</>
	);
};

export default Navbar;
