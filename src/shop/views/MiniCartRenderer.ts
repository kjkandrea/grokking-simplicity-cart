import AbstractRenderer from '../../abstracts/AbstractRenderer';
import {Product} from '../data/products';

export interface MiniCartProduct extends Product {
  quantity: number;
}

export class MiniCartRenderer implements AbstractRenderer {
  private readonly rootElement: HTMLElement;

  constructor(rootElement: HTMLElement) {
    this.rootElement = rootElement;
  }

  public render(totalPrice: number) {
    this.rootElement.innerHTML = '';
    this.rootElement.append(this.generatePriceElement(totalPrice));
  }

  private generatePriceElement(totalPrice: number) {
    const priceElement = document.createElement('p');
    priceElement.textContent = `$${totalPrice}`;

    return priceElement;
  }
}
