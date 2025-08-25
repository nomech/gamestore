import React, { useEffect, useState } from 'react';
import styles from './Orders.module.css';
import supabase from '../../../supabaseConfig';

const Orders = () => {
	const [orders, setOrder] = useState(null);

	useEffect(() => {
		const fetchOrders = async () => {
			let { data: user_orders, error } = await supabase
				.from('user_orders')
				.select('*')
				.range(0, 9);
			console.log(user_orders);

			setOrder(user_orders);
		};

		fetchOrders();
	}, []);

	return (
		<div className={styles.orders}>
			<div className={styles.ordersContainer}>
				<div className={styles.ordersHeader}>
					<div>Order nr</div>
					<div>Status</div>
					<div>Order Status</div>
				</div>
				<ul className={styles.orderList}>
					{orders &&
						orders.map((item) => (
							<li className={styles.orderItem} key={item.id}>
								<div>
									<p className={styles.order_number}>{item.order_number}</p>
								</div>
								<div>
									<p className={styles.order_status}>{item.order_status}</p>
								</div>
								<div>
									<p className={styles.created_at}>{item.created_at}</p>
								</div>
							</li>
						))}
				</ul>
			</div>
		</div>
	);
};

export default Orders;
