import {Cart as CartData, getCart} from "./data/cart";

class Cart {
	private readonly rootElement: HTMLElement;
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
		rootElement.innerHTML = '';
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

	public setFieldByName
	(
		cartItemName: keyof CartData,
		fieldName: keyof CartItem,
		value: CartItem[keyof CartItem],
	) {
		const newCart = { ...this.cart };
		newCart[cartItemName][field] = value;
		this.cart = newCart;

		this.update();
	}
}

export default function setup(rootElement: HTMLElement) {
	return new Cart(rootElement);
};

