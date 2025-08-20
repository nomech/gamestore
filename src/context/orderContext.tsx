import { createContext, useContext, useEffect, useState, type PropsWithChildren } from 'react';

type OrderContextType = {
	order: string;
	setOrder: React.Dispatch<React.SetStateAction<string>>;
};

const orderContext = createContext<OrderContextType | null>(null);

const getLocalOrder = () => {
	const order = localStorage.getItem('order_id');
	return order ? JSON.parse(order) : null;
};

export const OrderProvider = ({ children }: PropsWithChildren) => {
	const [order, setOrder] = useState<string>('');

	useEffect(() => {
		const localOrder = getLocalOrder();
		if (localOrder) {
			setOrder(localOrder);
		}
	}, []);

	useEffect(() => {
		if (order) {
			localStorage.setItem('order_id', JSON.stringify(order));
		}
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
