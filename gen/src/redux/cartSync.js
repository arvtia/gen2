import axios from 'axios';
import { addToCart, removeFromCart , deleteFromCart} from './cartSlice';
import { getUserId } from './user';

    const cartSyncMiddlewareRR = store => next => async action => {
    const result = next(action);

    const actionsToSync = [addToCart.type, removeFromCart.type, deleteFromCart.type];
    if (!actionsToSync.includes(action.type)) return result;

    const state = store.getState();
    const userId = getUserId();

    const cartData = {
        id: userId,
        items: state.cart.items,
        totalPrice: state.cart.items.reduce((sum, item) => {
        const price = parseFloat(item.price);
        return sum + price * item.quantity;
        }, 0)
    };

    try {
        // Try PATCH first in case cart already exists
        await axios.patch(`http://localhost:3001/cart/${userId}`, cartData);
    } catch (err) {
        if (err.response?.status === 404) {
        // If cart doesn't exist yet, create it
        await axios.post('http://localhost:3001/cart', cartData);
        } else {
        console.error('Failed to sync cart to db:', err);
        }
    }

    return result;
};

export default cartSyncMiddlewareRR;