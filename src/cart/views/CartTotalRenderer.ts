import AbstractRenderer from '../../abstracts/AbstractRenderer';

export class CartTotalRenderer implements AbstractRenderer {
  private readonly rootElement: HTMLElement;
  private readonly priceElement: HTMLElement;

  constructor(rootElement: HTMLElement) {
    this.rootElement = rootElement;
    this.priceElement = document.createElement('span');
  }

  public render(totalPrice: number) {
    this.rootElement.innerHTML = '';
    this.rootElement.append(this.generateCartTotalHTMLElement(totalPrice));
  }

  private generateCartTotalHTMLElement(totalPrice: number) {
    const wrapperElement = document.createElement('div');
    wrapperElement.textContent = 'total price : ';
    wrapperElement.append(this.priceElement);

    this.priceElement.textContent = String(totalPrice);

    return wrapperElement;
  }
}
