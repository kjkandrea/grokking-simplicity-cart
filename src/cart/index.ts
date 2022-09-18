import {Cart as CartData, CartItem} from "./data/cart";
import swallowCopy from "../utils/swallowCopy";

class Cart {
    private cart: CartData;
    private cartRenderer: CartRenderer;

    constructor(rootElement: HTMLElement, cartData: CartData) {
        this.cart = cartData;
        this.cartRenderer = new CartRenderer(rootElement);
        this.cartRenderer.render(this.cart);
    }

    // 함수 이름에 있는 암묵적 인자 들어내기
    public setCartItemFieldBy
    <FieldName extends keyof CartItem>
    (
        cartItemName: string,
        fieldName: FieldName,
        value: CartItem[FieldName],
    ) {
        const newCart = swallowCopy.copy(this.cart);
        if (!newCart[cartItemName]) throw Error('존재하지 않는 cartItemName 입니다.')
        newCart[cartItemName] = swallowCopy.objectSet(newCart[cartItemName], fieldName, value);
        this.cart = newCart;

        this.rerenderCartItemElement(cartItemName)
    }

    private rerenderCartItemElement(cartItemName: string) {
        this.cartRenderer.rerenderCartItemElement(cartItemName, this.cart[cartItemName])
    }
}

class CartRenderer {
    private readonly rootElement: HTMLElement;

    constructor(rootElement: HTMLElement) {
        this.rootElement = rootElement;
    }

    public render(cartData: CartData) {
        this.rootElement.append(this.generateCartHTMLElement(cartData));
    }

    private generateCartHTMLElement(cartData: CartData) {
        const wrapperElement = document.createElement('ul');

        Object.entries(cartData)
            .map(([cartItemName, cartItem]) => this.generateCartItemHTMLElement(cartItemName, cartItem))
            .forEach(cartItem => wrapperElement.appendChild(cartItem));

        return wrapperElement;
    }

    private generateCartItemHTMLElement(cartItemName: string, cartItem: CartItem) {
        const itemElement = document.createElement('li');
        this.setElementByItemName(itemElement, cartItemName);

        itemElement.textContent = this.generateCartItemTextContent(cartItemName, cartItem);

        return itemElement;
    }

    public rerenderCartItemElement(cartItemName: string, cartItem: CartItem) {
        const cartItemElement = this.getElementByItemName(cartItemName)!;

        cartItemElement.textContent = this.generateCartItemTextContent(cartItemName, cartItem);
    }

    private generateCartItemTextContent(cartItemName: string, cartItem: CartItem) {
        return `
			name: ${cartItemName},
			price: ${cartItem.price},
			quantity: ${cartItem.quantity},
			shipping: ${cartItem.shipping},
		`
    }

    private setElementByItemName(element: HTMLElement, itemName: string) {
        element.dataset.itemName = itemName;
    }

    private getElementByItemName(itemName: string) {
        return this.rootElement.querySelector(`[data-item-name=${itemName}]`);
    }
}

export default function setup(rootElement: HTMLElement, cartData: CartData) {
    return new Cart(rootElement, cartData);
};

