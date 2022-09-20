import './style.css';
import setup from './cart/Cart';
import {getCartData} from './cart/data/cart';
import {Cart, CartRenderer, CartTotalRenderer} from './cart';

interface CartRenderers {
  cart: CartRenderer;
  immediateDeliverableCart: CartRenderer;
  cartTotal: CartTotalRenderer;
}

class CartController {
  public readonly cart: Cart;

  constructor(cart: Cart, rootElement: HTMLElement) {
    this.cart = cart;
    this.mountDOM(rootElement);
    const renderers = this.createRenderers();
    this.linking(renderers);
  }

  private mountDOM(rootElement: HTMLElement) {
    rootElement.innerHTML = `
      <h2>장바구니</h2>
      <section id="cart"></section>
      <h2>즉시배송가능 상품</h2>
      <section id="immediate-deliverable-cart"></section>
      <h2>총 결제 금액</h2>
      <section id="cart-total"></section>
    `;
  }

  private get element() {
    return {
      cart: document.getElementById('cart')!,
      immediateDeliverableCart: document.getElementById(
        'immediate-deliverable-cart'
      )!,
      cartTotal: document.getElementById('cart-total')!,
    } as const;
  }

  private createRenderers(): CartRenderers {
    return {
      cart: new CartRenderer(this.element.cart),
      immediateDeliverableCart: new CartRenderer(
        this.element.immediateDeliverableCart
      ),
      cartTotal: new CartTotalRenderer(this.element.cartTotal),
    };
  }

  private linking(renderers: CartRenderers) {
    this.cart.subscribe(cartData => {
      renderers.cart.render(cartData);
      renderers.immediateDeliverableCart.render(cartData);
      renderers.cartTotal.render(this.cart.totalPrice);
    });
  }
}

const cartController = new CartController(
  setup(getCartData()),
  document.getElementById('app')!
);

cartController.cart.setCartItemFieldBy('shoes', 'price', 500);
cartController.cart.setCartItemFieldBy('tShort', 'price', 800);
