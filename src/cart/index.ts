import {Cart as CartData, CartItem} from "./data/cart";
import swallowCopy from "../utils/swallowCopy";

class Cart {
	private readonly rootElement: HTMLElement;
	private cart: CartData;

	constructor(rootElement: HTMLElement, cartData: CartData) {
		this.cart = cartData;
		this.rootElement = rootElement;
		this.render(this.rootElement);
	}

	private render(rootElement: HTMLElement) {
		rootElement.append(this.cartHTMLElement);
	}

	private get cartHTMLElement() {
		const wrapperElement = document.createElement('ul');

		Object.entries(this.cart)
			.map(([cartItemName, cartItem]) => this.generateCartItemHTMLElement(cartItemName, cartItem))
			.forEach(cartItem => wrapperElement.appendChild(cartItem));

		return wrapperElement;
	}

	private generateCartItemHTMLElement(cartItemName: string, cartItem: CartItem) {
		const itemElement = document.createElement('li');
		itemElement.dataset.itemName = cartItemName;

		itemElement.textContent = this.generateCartItemTextContent(cartItemName, cartItem);

		return itemElement;
	}

	private rerenderCartItemElement(cartItemName: string) {
		const cartItemElement = document.querySelector(`li[data-item-name=${cartItemName}]`)!

		cartItemElement.textContent = this.generateCartItemTextContent(cartItemName, this.cart[cartItemName]);
	}

	private generateCartItemTextContent(cartItemName: string, cartItem: CartItem) {
		return `
			name: ${cartItemName},
			price: ${cartItem.price},
			quantity: ${cartItem.quantity},
			shipping: ${cartItem.shipping},
		`
	}

	public setCartItemFieldBy
	(
		cartItemName: string,
		fieldName: keyof CartItem,
		value: CartItem[keyof CartItem],
	) {
		const newCart = swallowCopy.copy(this.cart);
		if (!newCart[cartItemName]) throw Error('존재하지 않는 cartItemName 입니다.')
		newCart[cartItemName] = swallowCopy.objectSet(newCart[cartItemName], fieldName, value);
		this.cart = newCart;

		this.rerenderCartItemElement(cartItemName)
	}
}

export default function setup(rootElement: HTMLElement, cartData: CartData) {
	return new Cart(rootElement, cartData);
};

