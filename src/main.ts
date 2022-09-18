import './style.css';
import setup from './cart';
import {getCartData} from './cart/data/cart';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="cart"></div>
`;

const cart = setup(
  document.querySelector<HTMLDivElement>('#cart')!,
  getCartData()
);
cart.setCartItemFieldBy('shoes', 'price', 500);
cart.setCartItemFieldBy('tShort', 'price', 800);
