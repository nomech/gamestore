import { createContext, useContext, useEffect, useReducer, type PropsWithChildren } from 'react';
import { cartReducer } from '../reducer/cartReducer';
import type { Database } from '../types/supabase';
import type { CartAction } from '../reducer/cartReducer';

type Game = Database['public']['Tables']['games']['Row'];
type CartItem = {
	product: Game;
	quantity: number;
};

type CartContextValue = {
	cart: CartItem[];
	dispatch: React.Dispatch<CartAction>;
};

type cartProps = PropsWithChildren;

const CartContext = createContext<CartContextValue | null>(null);

const getCartToken = (): string => {
	let cartToken = localStorage.getItem('gameStore_cartToken');

	if (!cartToken) {
		cartToken = `gameStore_${crypto.randomUUID()}`;
		localStorage.setItem('gameStore_cartToken', cartToken);
	}

	return cartToken;
};

export const CartProvider = ({ children }: cartProps) => {
	const cartToken = getCartToken();
	const [cart, dispatch] = useReducer(cartReducer, []);

	useEffect(() => {
		const storedCart = JSON.parse(localStorage.getItem(cartToken) || '[]');
		dispatch({ type: 'UPDATE_CART', payload: storedCart });
	}, [cartToken]);

	useEffect(() => {
		localStorage.setItem(cartToken, JSON.stringify(cart));
	}, [cartToken, cart]);

	return <CartContext.Provider value={{ dispatch, cart }}>{children}</CartContext.Provider>;
};

export const useCart = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error('useCart must be used within a CartProvider');
	}
	return context;
};
