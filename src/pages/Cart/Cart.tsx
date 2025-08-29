import { useCart } from '../../context/cartContext';
import { formatCurrency } from '../../utils/currency';
import styles from './Cart.module.css';
import Button from '../../components/Button/Button';
import { X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import supabase from '../../../supabaseConfig';
import { useOrder } from '../../context/orderContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
	const { cart, dispatch } = useCart();
	const { user } = useAuth();
	const { setOrder } = useOrder();
	const navigate = useNavigate();

	const subTotal = cart.reduce((acc, item) => acc + item.quantity, 0);
	const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

	const handleOnClickAdjustQuantity = (action, item) => {
		dispatch({ type: action, payload: item });
	};

	const handleOnClickItem = (id: string) => {
		if (!id) {
			return;
		}
		navigate(`/games/${id}`);
	};

	const handleOnClickProceedToCheckout = async () => {
		const existingOrder = localStorage.getItem('order_id');
		if (!existingOrder) {
			try {
				const { data: order, error: orderError } = await supabase
					.from('orders')
					.insert([
						{
							user_id: user.id,
							email: user.email,
						},
					])
					.select()
					.single(); // return just one object

				if (orderError) {
					console.error(orderError);
				} else {
					console.log('New order:', order);
				}

				setOrder(order.id);

				const orderLines = cart.map((item) => ({
					order_id: order.id,
					product_id: item.id,
					quantity: item.quantity,
				}));

				const { error: orderItemsError } = await supabase
					.from('order_items')
					.insert(orderLines);

				navigate('/checkout');
			} catch (err) {
				console.log(err);
			}
		} else {
			navigate('/checkout');
		}
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
					<p className={styles.emptyCart}>Your cart is empty</p>
				) : (
					<ul className={styles.cartList}>
						{cart.map((item) => (
							<li className={styles.cartItem} key={item.id}>
								<div>
									<h2
										className={styles.title}
										onClick={() => handleOnClickItem(item.id)}
									>
										{item.title}
									</h2>
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
			{cart.length > 0 && (
				<div className={styles.cartSummary}>
					<div className={styles.summaryHeader}>
						<h2>Order Summary</h2>
					</div>
					<div className={styles.summaryDetails}>
						<span>Subtotal </span>
						<span>{subTotal} items</span>
					</div>
					<div className={styles.summaryTotal}>
						<span className={styles.total}>Total</span>
						<span>{formatCurrency(total)}</span>
					</div>
					<Button
						className="checkoutButton"
						onClick={() => handleOnClickProceedToCheckout()}
					>
						Proceed to Checkout
					</Button>
				</div>
			)}
		</div>
	);
};

export default Cart;
