import type { Database } from '../types/supabase';
type Game = Database['public']['Tables']['games']['Row'];

type CartItem = {
	product: Game;
	quantity: number;
};

interface GameWithId extends CartItem {
	id: number;
}

interface AddToCartAction {
	type: 'ADD_TO_CART';
	payload: GameWithId;
}

interface RemoveFromCartAction {
	type: 'REMOVE_FROM_CART';
	payload: { id: number };
}

interface ClearCartAction {
	type: 'CLEAR_CART';
}

interface IncreaseQuantityAction {
	type: 'INCREASE_QUANTITY';
	payload: { id: number };
}

interface DecreaseQuantityAction {
	type: 'DECREASE_QUANTITY';
	payload: { id: number };
}

interface UpdateCartAction {
	type: 'UPDATE_CART';
	payload: GameWithId[];
}

export type CartAction =
	| AddToCartAction
	| RemoveFromCartAction
	| ClearCartAction
	| IncreaseQuantityAction
	| DecreaseQuantityAction
	| UpdateCartAction;

export const cartReducer = (state: GameWithId[], action: CartAction): GameWithId[] => {
	console.log('action', action);
	console.log('state', state);
	switch (action.type) {
		case 'ADD_TO_CART': {
			const existingItem = state.find((item) => item.id === action.payload.id);
			if (existingItem) {
				return state.map((item) =>
					item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
				);
			}
			return [...state, { ...action.payload, quantity: 1 }];
		}

		case 'REMOVE_FROM_CART':
			return state.filter((item) => item.id !== action.payload.id);

		case 'CLEAR_CART':
			return [];

		case 'INCREASE_QUANTITY':
			return state.map((item) => {
				return item.id === action.payload.id
					? { ...item, quantity: item.quantity + 1 }
					: item;
			});

		case 'DECREASE_QUANTITY':
			return state.map((item) =>
				item.id === action.payload.id && item.quantity > 1
					? { ...item, quantity: item.quantity - 1 }
					: item
			);

		case 'UPDATE_CART':
			return action.payload ?? [];

		default:
			return state;
	}
};
