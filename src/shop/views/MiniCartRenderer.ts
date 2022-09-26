import AbstractRenderer from '../../abstracts/AbstractRenderer';

export class MiniCartRenderer implements AbstractRenderer {
  private readonly rootElement: HTMLElement;

  constructor(rootElement: HTMLElement) {
    this.rootElement = rootElement;
    console.log(this.rootElement);
  }

  render(data: unknown) {
    console.log(data);
  }
}
