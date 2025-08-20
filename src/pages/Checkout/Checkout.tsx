import { useEffect, useState } from 'react';
import { useOrder } from '../../context/orderContext';
import supabase from '../../../supabaseConfig';
import { formatCurrency } from '../../utils/currency';

const Checkout = () => {
	const [orderData, setOrderData] = useState(null);
	const { order } = useOrder();

	useEffect(() => {
		// get order info from db
		const fetchOrder = async () => {
			const { data, error } = await supabase
				.from('my_orders_with_items2')
				.select('*')
				.eq('id', order)
				.order('created_at', { ascending: false });

			if (error) {
				console.error('Error fetching order:', error);
			} else {
				console.log('Order fetched successfully:', data);
			}
			setOrderData(data[0]);
		};

		fetchOrder();
	}, [order]);

	console.log(orderData);

	return (
		<div>
			{orderData && <h1>{orderData.order_number}</h1>}
			<div>
				{orderData &&
					orderData.items.map((item) => (
						<div key={item.product_id}>
							<p>Quantity: {item.quantity}</p>
							<p>Price: {formatCurrency(item.price)}</p>
						</div>
					))}
			</div>
		</div>
	);
};

export default Checkout;
