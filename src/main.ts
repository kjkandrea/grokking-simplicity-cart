import './style.css';
import setup from './cart/Cart';
import {getCartData} from './cart/data/cart';
import {CartRenderer, CartTotalRenderer} from './cart';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <h2>장바구니</h2>
  <section id="cart"></section>
  <h2>즉시배송가능 상품</h2>
  <section id="immediate-deliverable-cart"></section>
  <h2>총 결제 금액</h2>
  <section id="cart-total"></section>
`;

const cartData = getCartData();

const element = {
  cart: document.getElementById('cart')!,
  immediateDeliverableCart: document.getElementById(
    'immediate-deliverable-cart'
  )!,
  cartTotal: document.getElementById('cart-total')!,
};

const cart = setup(cartData);

const cartRenderer = new CartRenderer(element.cart);
const immediateDeliverableCartRenderer = new CartRenderer(
  element.immediateDeliverableCart
);
const cartTotalRenderer = new CartTotalRenderer(element.cartTotal);

cartRenderer.render(cartData);
cart.subscribe(cartData => {
  cartRenderer.render(cartData);
  immediateDeliverableCartRenderer.render(cartData);
  cartTotalRenderer.render(cart.totalPrice);
});

cart.setCartItemFieldBy('shoes', 'price', 500);
cart.setCartItemFieldBy('tShort', 'price', 800);
