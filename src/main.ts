import './style.css';
import './cart.scss';
import setup from './cart/Cart';
import {getCartData} from './cart/data/cart';
import {Cart, CartRenderer, CartTotalRenderer} from './cart';

interface CartRenderers {
  cart: CartRenderer;
  immediateDeliverableCart: CartRenderer;
  cartTotal: CartTotalRenderer;
}

const elementId = {
  cart: 'cart',
  immediateDeliverableCart: 'immediate-deliverable-cart',
  cartTotal: 'cart-total',
} as const;

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
      <section id="${elementId.cart}"></section>
      <h2>즉시배송가능 상품</h2>
      <section id="${elementId.immediateDeliverableCart}"></section>
      <h2>총 결제 금액</h2>
      <section id="${elementId.cartTotal}"></section>
    `;
  }

  private get element() {
    return {
      cart: document.getElementById(elementId.cart)!,
      immediateDeliverableCart: document.getElementById(
        elementId.immediateDeliverableCart
      )!,
      cartTotal: document.getElementById(elementId.cartTotal)!,
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
      renderers.immediateDeliverableCart.render(
        this.cart.immediateDeliverableCart
      );
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
