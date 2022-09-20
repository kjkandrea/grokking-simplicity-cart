export default class Subscribe<Data> {
  protected data: Data;

  constructor(data: Data) {
    this.data = data;
  }

  private nextCallback?: (data: Data) => void;
  public subscribe(callback: (data: Data) => void) {
    this.nextCallback = callback;
  }

  protected next() {
    this.nextCallback?.(this.data);
  }
}
