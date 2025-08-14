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
import { useAuth } from '../context/AuthContext';

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route index element={<Home />} />
			<Route path="games" element={<GamesList />} />
			<Route path="games/:id" element={<GamesList />} />
			<Route path="game-details" element={<GameDetails />} />
			<Route path="checkout" element={<Checkout />} />
			<Route path="cart" element={<Cart />} />
			<Route path="sign-up" element={<SignUp />} />
			<Route path="sign-in" element={<SignIn />} />
			<Route path="profile" element={<Profile />} />
			<Route path="contact" element={<Contact />} />
			<Route path="verify-email" element={<VerifyEmail />} />
			<Route path="*" element={<NotFound />} />
		</Route>
	)
);
