import './style.css';
import './cart.scss';
import setup from './cart/Cart';
import {getCartData} from './cart/data/cart';
import {CartController} from './cart';
import {NavigationController, Router, routes} from './router';

const appElement = document.getElementById('app')!;

const navigationController = new NavigationController(
  new Router(routes),
  appElement
);
console.log(navigationController);

const cartController = new CartController(setup(getCartData()), appElement);

cartController.cart.setCartItemFieldBy('shoes', 'price', 500);
cartController.cart.setCartItemFieldBy('tShort', 'price', 800);
cartController.cart.setCartItemOptionBy('hood', 'color', 'deep dark');
cartController.cart.setCartItemOptionBy('tShort', 'size', 5);
