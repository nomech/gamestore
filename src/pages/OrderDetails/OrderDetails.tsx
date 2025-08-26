import { useEffect, useState } from 'react';
import supabase from '../../../supabaseConfig';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './OrderDetails.module.css';
import { formatCurrency } from '../../utils/currency';

const OrderDetails = () => {
	const [orderItems, setOrderItems] = useState<any[]>([]);

	const params = useParams();
	const orderId = params.id;

	useEffect(() => {
		const getOrderData = async () => {
			const { data: order_items, error } = await supabase
				.from('order_items')
				.select(
					`
		quantity,
		Price:unit_price,
		games!inner (
		id,
		title
		)
	`
				)
				.eq('order_id', orderId);

			setOrderItems(order_items || []);
			console.log(order_items);
		};

		getOrderData();
	}, []);

	const navigate = useNavigate();

	const handleOnClickProduct = (productId: number) => {
		navigate(`/games/${productId}`);
	};

	return (
		<div className={styles.cart}>
			<div className={styles.cartContainer}>
				<div className={styles.cartHeader}>
					<div className={styles.headerProduct}>Product</div>
					<div className={styles.headerPrice}>Price</div>
					<div className={styles.headerQuantity}>Quantity</div>
				</div>
				{orderItems.length === 0 ? (
					<p className={styles.emptyCart}>No items found in this order.</p>
				) : (
					<ul className={styles.cartList}>
						{orderItems.map((item, index) => (
							<li key={item.id || index} className={styles.cartItem}>
								<div className={styles.productInfo}>
									<h2
										className={styles.title}
										onClick={() => handleOnClickProduct(item.games.id)}
									>
										{item.games.title}
									</h2>
								</div>
								<div className={styles.priceInfo}>
									<p>{formatCurrency(item.Price)}</p>
								</div>
								<div className={styles.quantityInfo}>
									<p>{item.quantity}</p>
								</div>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};

export default OrderDetails;
