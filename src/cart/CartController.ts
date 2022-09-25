import {CartRenderer} from './views/CartRenderer';
import {CartTotalRenderer} from './views/CartTotalRenderer';
import {Cart} from './Cart';

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

export class CartController {
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
      <section id="${elementId.cart}" class="cart"></section>
      <h2>즉시배송가능 상품</h2>
      <section id="${elementId.immediateDeliverableCart}" class="cart"></section>
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
