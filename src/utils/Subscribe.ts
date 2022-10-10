export type Subscriber<Data = any> = (data: Data) => void;

export class Subscribe<Data> {
  protected data: Data;

  constructor(data: Data) {
    this.data = data;
  }

  private nextCallback?: Subscriber<Data>;
  public subscribe(callback: Subscriber<Data>) {
    this.nextCallback = callback;
  }

  protected next() {
    this.nextCallback?.(this.data);
  }
}
