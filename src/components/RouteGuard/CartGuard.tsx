import { Navigate, Outlet } from 'react-router-dom';

const CartGuard: React.FC = () => {
	const hasOrderId = localStorage.getItem('order_id');

	if (!hasOrderId) {
		return <Navigate to="/cart" replace />;
	} else {
		return <Outlet />;
	}
};

export default CartGuard;
