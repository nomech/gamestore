import styles from './Checkout.module.css';
import { useEffect, useState } from 'react';
import { useOrder } from '../../context/orderContext';
import supabase from '../../../supabaseConfig';
import { formatCurrency } from '../../utils/currency';
import { useForm } from 'react-hook-form';
import { set, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button/Button';
import { useCart } from '../../context/cartContext';
import { useNavigate } from 'react-router-dom';

type OrderItem = {
	product_id: string;
	title: string;
	quantity: number;
	unit_price: number;
};

type OrderData = {
	items: OrderItem[];
	[key: string]: any;
};

const formSchema = z.object({
	address: z.string().min(1, 'Address is required'),
	city: z.string().min(1, 'City is required'),
	postalCode: z.string().min(1, 'Postal code is required'),
});

type DataValues = z.infer<typeof formSchema>;

const Checkout = () => {
	const [orderData, setOrderData] = useState<OrderData | null>(null);
	const { order } = useOrder();
	const { user } = useAuth();
	const { dispatch } = useCart();

	const navigate = useNavigate();

	const identity = user.identities[0].identity_data;
	console.log(identity);

	useEffect(() => {
		// get order info from db
		const fetchOrder = async () => {
			const { data, error } = await supabase
				.from('user_orders')
				.select('*')
				.eq('id', order)
				.order('created_at', { ascending: false });

			if (error) {
				console.error('Error fetching order:', error);
			} else {
				console.log('Order fetched successfully:', data);
			}
			setOrderData(data && data.length > 0 ? data[0] : null);
		};

		fetchOrder();
	}, [order]);

	const defaultValues = { address: '', city: '', postalCode: '' };

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitSuccessful },
	} = useForm<DataValues>({
		mode: 'onSubmit',
		reValidateMode: 'onBlur',
		defaultValues: defaultValues,
		resolver: zodResolver(formSchema),
	});

	const onSubmit = async (data) => {
		try {
			const { data: updatedData, error: updateError } = await supabase
				.from('orders')
				.update({ shipping_address: data })
				.eq('id', order)
				.select();

			if (updatedData) {
				dispatch({ type: 'CLEAR_CART' });
				setOrderData('');
				localStorage.removeItem('order_id');
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (isSubmitSuccessful) {
			const timer = setTimeout(() => {
				navigate('/orders');
			}, 2000);
			return () => clearTimeout(timer);
		}
	}, [isSubmitSuccessful]);

	return (
		<>
			{isSubmitSuccessful && <p>Order confirmed!</p>}
			{!isSubmitSuccessful && (
				<div className={styles.checkoutWrapper}>
					<div className={styles.formContainer}>
						<h2 className={styles.sectionTitle}>Delivery Information</h2>
						<div className={styles.identityContainer}>
							<p>{`${identity?.first_name} ${identity?.last_name}`}</p>
							<p>{identity?.email}</p>
							<p>{identity?.phone}</p>
						</div>
						<form className={styles.deliveryForm} onSubmit={handleSubmit(onSubmit)}>
							<div className={styles.formGroup}>
								<label htmlFor="address">Address</label>
								<input type="text" id="address" {...register('address')} />
								{errors.address && <span>{errors.address.message}</span>}
							</div>
							<div className={styles.formGroup}>
								<label htmlFor="city">City</label>
								<input type="text" id="city" {...register('city')} />
								{errors.city && <span>{errors.city.message}</span>}
							</div>
							<div className={styles.formGroup}>
								<label htmlFor="postalCode">Postal Code</label>
								<input type="text" id="postalCode" {...register('postalCode')} />
								{errors.postalCode && <span>{errors.postalCode.message}</span>}
							</div>
							<Button className="confirmButton">Confirm Order</Button>
						</form>
					</div>
					<div className={styles.summaryContainer}>
						<div className={styles.summaryHeader}>
							<h2>Order Summary</h2>
						</div>
						<div className={styles.summaryList}>
							{orderData &&
								Array.isArray(orderData.items) &&
								orderData.items.map((item: OrderItem) => (
									<div className={styles.summaryItem} key={item.product_id}>
										<span className={styles.title}>{item.title}</span>
										<span>Qty: {item.quantity}</span>
										<span>{formatCurrency(item.unit_price)}</span>
									</div>
								))}
							{orderData && (
								<div className={styles.summaryTotal}>
									Total: {formatCurrency(orderData.grand_total)}
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Checkout;
