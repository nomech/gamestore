import React from 'react';
import { useCart } from '../../context/cartContext';
import { formatCurrency } from '../../utils/currency';
import styles from './Cart.module.css';
import Button from '../../components/Button/Button';
import { X } from 'lucide-react';

const Cart = () => {
	const { cart, dispatch } = useCart();
	console.log(cart);

	const handleOnClickAdjustQuantity = (action, item) => {
		dispatch({ type: action, payload: item });
	};

	return (
		<div className={styles.cart}>
			<div className={styles.cartContainer}>
				<div className={styles.cartHeader}>
					<div>Product</div>
					<div>Price</div>
					<div>Quantity</div>
				</div>
				{cart.length === 0 ? (
					<p>Your cart is empty</p>
				) : (
					<ul className={styles.cartList}>
						{cart.map((item) => (
							<li className={styles.cartItem} key={item.id}>
								<div>
									<h2 className={styles.title}>{item.title}</h2>
									<p className={styles.platform}>{item.platform.platform}</p>
								</div>
								<div className={styles.imageContainer}>
									<p>{formatCurrency(item.price)}</p>
								</div>
								<div className={styles.quantityControl}>
									<Button
										className="qty-btn"
										onClick={() =>
											handleOnClickAdjustQuantity('DECREASE_QUANTITY', item)
										}
									>
										-
									</Button>
									<div className={styles.qtyDisplay}>{item.quantity}</div>
									<Button
										className="qty-btn"
										onClick={() =>
											handleOnClickAdjustQuantity('INCREASE_QUANTITY', item)
										}
									>
										+
									</Button>
								</div>
								<Button
									className="removeButton"
									onClick={() =>
										handleOnClickAdjustQuantity('REMOVE_FROM_CART', item)
									}
								>
									<X size={16} />
								</Button>
							</li>
						))}
					</ul>
				)}
			</div>
			<div className={styles.cartSummary}>
				<div className={styles.summaryHeader}>
					<h2>Order Summary</h2>
				</div>
				<div className={styles.summaryDetails}>
					<span>Subtotal </span>
					<span>({cart.reduce((acc, item) => acc + item.quantity, 0)}) items</span>
				</div>
				<div className={styles.summaryTotal}>
					<span className={styles.total}>Total</span>
					<span>
						{formatCurrency(
							cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
						)}
					</span>
				</div>
				<Button className="checkoutButton">Proceed to Checkout</Button>
			</div>
		</div>
	);
};

export default Cart;
