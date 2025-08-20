import { createContext, useContext, useEffect, useState, type PropsWithChildren } from 'react';

type OrderContextType = {
	order: string;
	setOrder: React.Dispatch<React.SetStateAction<string>>;
};

const orderContext = createContext<OrderContextType | null>(null);

export const OrderProvider = ({ children }: PropsWithChildren) => {
	const [order, setOrder] = useState<string>('');

	useEffect(() => {
		if (order) {
			//save order to localstorage
			localStorage.setItem('order_id', order);
		}

		console.log(order);
	}, [order]);

	return <orderContext.Provider value={{ order, setOrder }}>{children}</orderContext.Provider>;
};

export const useOrder = () => {
	const context = useContext(orderContext);
	if (!context) {
		throw new Error('useOrder must be used within an OrderProvider');
	}
	return context;
};
