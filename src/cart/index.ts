import {Cart as CartData, getCart} from "./data/cart";

class Cart {
	private cart: CartData;

	constructor(rootElement: HTMLElement) {
		this.cart = getCart();
		this.render(rootElement)
	}

	private render(rootElement: HTMLElement) {
		rootElement.append(this.cartHTMLElement);
	}

	get cartHTMLElement() {
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

