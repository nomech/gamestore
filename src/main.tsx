import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/routes.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import { CartProvider } from './context/cartContext.tsx';
import { OrderProvider } from './context/orderContext.tsx';

createRoot(document.getElementById('root')!).render(
	<AuthProvider>
		<OrderProvider>
			<CartProvider>
				<RouterProvider router={router} />
			</CartProvider>
		</OrderProvider>
	</AuthProvider>
);
