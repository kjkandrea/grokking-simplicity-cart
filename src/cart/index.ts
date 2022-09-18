import {Cart as CartData, CartItem} from "./data/cart";
import swallowCopy from "../utils/swallowCopy";

class Cart {
    private cart: CartData;
    private cartRenderer: CartRenderer;
    private cartTotalRenderer: CartTotalRenderer;

    constructor(rootElement: HTMLElement, cartData: CartData) {
        this.cart = cartData;
        this.cartRenderer = new CartRenderer(rootElement);
        this.cartTotalRenderer = new CartTotalRenderer(rootElement);
        this.cartRenderer.render(this.cart);
        this.cartTotalRenderer.render(this.totalPrice);
    }

    get totalPrice () {
        return this.mapCart(cartItem => cartItem.price).reduce((a, b) => a + b);
    }

    // 함수 이름에 있는 암묵적 인자 드러내기
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

        this.rerenderCartItemElement(cartItemName);
        if (fieldName === 'price') this.rerenderCartTotalElement();
    }

    private rerenderCartItemElement(cartItemName: string) {
        this.cartRenderer.rerenderCartItemElement(cartItemName, this.cart[cartItemName])
    }

    private rerenderCartTotalElement() {
        this.cartTotalRenderer.rerender(this.totalPrice);
    }

    private mapCart<U>(mapper: (cartItem: CartItem) => U) {
        return Object.values(this.cart).map(mapper);
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

class CartTotalRenderer {
    private readonly rootElement: HTMLElement;
    private readonly priceElement: HTMLElement;

    constructor(rootElement: HTMLElement) {
        this.rootElement = rootElement;
        this.priceElement = document.createElement('span');
    }

    public render(totalPrice: number) {
        this.rootElement.append(this.generateCartTotalHTMLElement(totalPrice));
    }

    public rerender(totalPrice: number) {
        this.priceElement.textContent = String(totalPrice);
    }

    private generateCartTotalHTMLElement(totalPrice: number) {
        const wrapperElement = document.createElement('div');
        wrapperElement.textContent = 'total price : ';
        wrapperElement.append(this.priceElement);

        this.priceElement.textContent = String(totalPrice);

        return wrapperElement;
    }
}

export default function setup(rootElement: HTMLElement, cartData: CartData) {
    return new Cart(rootElement, cartData);
};

