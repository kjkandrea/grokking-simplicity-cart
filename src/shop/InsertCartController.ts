import {MiniCartRenderer} from './views/MiniCartRenderer';
import {ProductsRenderer} from './views/ProductsRenderer';
import {Product} from './data/products';
import {InsertCart} from './InsertCart';

interface InsertCartRenderers {
  miniCart: MiniCartRenderer;
  products: ProductsRenderer;
}

const elementId = {
  miniCart: 'mini-cart',
  products: 'products',
} as const;

export class InsertCartController {
  public readonly insertCart: InsertCart;

  constructor(
    insertCart: InsertCart,
    products: Product[],
    rootElement: HTMLElement
  ) {
    this.insertCart = insertCart;
    this.mountDOM(rootElement);
    const renderers = this.createRenderers();
    renderers.products.render(products);
    this.linking(renderers);
    this.bindEvents(renderers);
  }

  mountDOM(rootElement: HTMLElement) {
    rootElement.innerHTML = '';
    rootElement.insertAdjacentHTML(
      'beforeend',
      `
        <header>
          <h1>MegaMart</h1>
          <div id="${elementId.miniCart}"></div>
        </header>
        <main>
          <section id="${elementId.products}" class="products"></section>
        </main>
      `
    );
  }

  private get element() {
    return {
      miniCart: document.getElementById(elementId.miniCart)!,
      products: document.getElementById(elementId.products)!,
    } as const;
  }

  private createRenderers(): InsertCartRenderers {
    return {
      miniCart: new MiniCartRenderer(this.element.miniCart),
      products: new ProductsRenderer(this.element.products),
    };
  }

  private linking(renderers: InsertCartRenderers) {
    this.insertCart.subscribe(() => {
      console.log('insertCart changed');
      renderers.miniCart.render(this.insertCart.totalPrice);
    });
  }

  private bindEvents(renderers: InsertCartRenderers) {
    renderers.products.on('@click:buyNow', product =>
      this.insertCart.setProduct(product)
    );
  }
}
