import './style.css';
import './cart.scss';
import setup from './cart/Cart';
import {getCartData} from './cart/data/cart';
import {CartController} from './cart';
import {NavigationController, routes} from './router';
import {getProducts, InsertCart, InsertCartController} from './shop';

const appElement = document.getElementById('app')!;
const routeElement = document.createElement('nav');
const routeViewElement = document.createElement('main');
appElement.append(routeElement);
appElement.append(routeViewElement);

const boot = {
  cart() {
    const cartController = new CartController(
      setup(getCartData()),
      routeViewElement
    );
    cartController.cart.setCartItemFieldBy('shoes', 'price', 500);
    cartController.cart.setCartItemFieldBy('tShort', 'price', 800);
    cartController.cart.setCartItemOptionBy('hood', 'color', 'deep dark');
    cartController.cart.setCartItemOptionBy('tShort', 'size', 5);
  },
  shop() {
    const insertCartController = new InsertCartController(
      new InsertCart([]),
      getProducts(),
      routeViewElement
    );
    console.log(insertCartController);
  },
} as const;

const navigationController = new NavigationController(
  routes,
  routeElement,
  id => boot[id]()
);
console.log(navigationController);
