import './style.css';
import setup from './cart/Cart';
import {getCartData} from './cart/data/cart';
import {CartRenderer} from './cart';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="cart"></div>
`;

const cartData = getCartData();

const cart = setup(document.querySelector<HTMLDivElement>('#cart')!, cartData);

const cartRenderer = new CartRenderer(
  document.querySelector<HTMLDivElement>('#cart')!
);
cartRenderer.render(cartData);
cart.subscribe(cartData => cartRenderer.render(cartData));

cart.setCartItemFieldBy('shoes', 'price', 500);
cart.setCartItemFieldBy('tShort', 'price', 800);
