import {MiniCartRenderer} from './views/MiniCartRenderer';
import {ProductsRenderer} from './views/ProductsRenderer';

interface InsertCartRenderers {
  miniCart: MiniCartRenderer;
  products: ProductsRenderer;
}

const elementId = {
  miniCart: 'mini-cart',
  products: 'products',
} as const;

export class InsertCartController {
  constructor(rootElement: HTMLElement) {
    this.mountDOM(rootElement);
    const renderers = this.createRenderers();
    console.log(renderers);
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
}
