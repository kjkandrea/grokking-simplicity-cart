import {Cart as CartData, getCart} from "./data/cart";

class Cart {
	private rootElement: HTMLElement;
	private cart: CartData;

	constructor(rootElement: HTMLElement) {
		this.cart = getCart();
		this.rootElement = rootElement;
		this.update();
	}

	private update() {
		this.render(this.rootElement);
	}

	private render(rootElement: HTMLElement) {
		rootElement.append(this.cartHTMLElement);
	}

	private get cartHTMLElement() {
		const wrapperElement = document.createElement('ul');

		Object.entries(this.cart)
			.map(([cartItemName, cart]) => {
				const itemElement = document.createElement('li');

				itemElement.textContent = `
					name: ${cartItemName},
					price: ${cart.price},
					quantity: ${cart.quantity},
					shipping: ${cart.shipping},
				`

				return itemElement;
			})
			.forEach(cartItem => wrapperElement.appendChild(cartItem));

		return wrapperElement;
	}
}

export default function setup(rootElement: HTMLElement) {
	return new Cart(rootElement);
};

