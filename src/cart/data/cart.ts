export interface CartItem {
  price: number;
  quantity: number;
  shipping: string;
  immediateDeliveryAvailable?: true;
}

export interface Cart {
  [cartItemName: string]: CartItem;
}

export const getCartData = (): Cart => ({
  shoes: {
    price: 1000,
    quantity: 1,
    shipping: 'seoul',
    immediateDeliveryAvailable: true,
  },
  hood: {
    price: 800,
    quantity: 1,
    shipping: 'seoul',
    immediateDeliveryAvailable: true,
  },
  tShort: {
    price: 1500,
    quantity: 2,
    shipping: 'my company',
  },
});
