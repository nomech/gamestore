import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home/Home';
import GamesList from '../pages/GamesList/GamesList';
import Cart from '../pages/Cart/Cart';
import SignUp from '../pages/SignUp/SignUp';
import Profile from '../pages/Profile/Profile';
import Contact from '../pages/Contact/Contact';
import VerifyEmail from '../pages/VerifyEmail/VerifyEmail';
import GameDetails from '../pages/GameDetails/GameDetails';
import NotFound from '../pages/NotFound/NotFound';
import Checkout from '../pages/Checkout/Checkout';
import SignIn from '../pages/SignIn/SignIn';
import RouteGuard from '../components/RouteGuard/RouteGuard';

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			{/* // Public routes */}
			<Route path="sign-up" element={<SignUp />} />
			<Route path="sign-in" element={<SignIn />} />
			<Route path="contact" element={<Contact />} />
			<Route path="verify-email" element={<VerifyEmail />} />
			<Route path="*" element={<NotFound />} />

			{/* // Protected routes */}
			<Route
				index
				element={
					<RouteGuard>
						<Home />
					</RouteGuard>
				}
			/>
			<Route
				path="games"
				element={
					<RouteGuard>
						<GamesList />
					</RouteGuard>
				}
			/>
			<Route
				path="games/:id"
				element={
					<RouteGuard>
						<GamesList />
					</RouteGuard>
				}
			/>
			<Route
				path="game-details"
				element={
					<RouteGuard>
						<GameDetails />
					</RouteGuard>
				}
			/>
			<Route
				path="checkout"
				element={
					<RouteGuard>
						<Checkout />
					</RouteGuard>
				}
			/>
			<Route
				path="cart"
				element={
					<RouteGuard>
						<Cart />
					</RouteGuard>
				}
			/>
			<Route
				path="profile"
				element={
					<RouteGuard>
						<Profile />
					</RouteGuard>
				}
			/>
		</Route>
	)
);
