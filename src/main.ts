import './style.css';
import setup from './cart/Cart';
import {getCartData} from './cart/data/cart';
import {CartRenderer, CartTotalRenderer} from './cart';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="cart"></div>
`;

const cartData = getCartData();
const cartRootElement = document.querySelector<HTMLDivElement>('#cart')!;

const cart = setup(cartData);

const cartRenderer = new CartRenderer(cartRootElement);
const cartTotalRenderer = new CartTotalRenderer(cartRootElement);

cartRenderer.render(cartData);
cart.subscribe(cartData => {
  cartRenderer.render(cartData);
  cartTotalRenderer.render(cart.totalPrice);
});

cart.setCartItemFieldBy('shoes', 'price', 500);
cart.setCartItemFieldBy('tShort', 'price', 800);
