import React, { useEffect, useState } from 'react';
import styles from './Orders.module.css';
import supabase from '../../../supabaseConfig';
import { formatCurrency } from '../../utils/currency';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
	const [orders, setOrder] = useState(null);

	const navigate = useNavigate();

	useEffect(() => {
		const fetchOrders = async () => {
			let { data: user_orders, error } = await supabase
				.from('user_orders')
				.select('*')
				.range(0, 9);
			setOrder(user_orders);
		};

		fetchOrders();
	}, []);

	const handleOnClickOrder = async (id: string) => {
		navigate(`/orders/${id}`);
	};

	const formatDate = (dateString: string) => {
		const options: Intl.DateTimeFormatOptions = {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		};
		return new Date(dateString).toLocaleDateString(undefined, options);
	};

	return (
		<div className={styles.orders}>
			<div className={styles.ordersContainer}>
				<div className={styles.ordersHeader}>
					<div>Order ID</div>
					<div>Order Status</div>
					<div>Order Date</div>
					<div>Total Amount </div>
				</div>
				<ul className={styles.orderList}>
					{orders &&
						orders.map((item) => (
							<li
								className={styles.orderItem}
								key={item.id}
								onClick={() => handleOnClickOrder(item.id)}
							>
								<div>
									<p className={styles.order_number}>{item.order_number}</p>
								</div>
								<div className={styles.order_status}>
									<div></div>
									<p>{item.order_status}</p>
								</div>
								<div>
									<p className={styles.created_at}>{formatDate(item.created_at)}</p>
								</div>
								<div>
									<p className={styles.created_at}>
										{formatCurrency(item.grand_total)}
									</p>
								</div>
							</li>
						))}
				</ul>
			</div>
		</div>
	);
};

export default Orders;
