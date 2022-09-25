import './style.css';
import './cart.scss';
import setup from './cart/Cart';
import {getCartData} from './cart/data/cart';
import {CartController} from './cart';

const cartController = new CartController(
  setup(getCartData()),
  document.getElementById('app')!
);

cartController.cart.setCartItemFieldBy('shoes', 'price', 500);
cartController.cart.setCartItemFieldBy('tShort', 'price', 800);
cartController.cart.setCartItemOptionBy('hood', 'color', 'deep dark');
cartController.cart.setCartItemOptionBy('tShort', 'size', 5);
