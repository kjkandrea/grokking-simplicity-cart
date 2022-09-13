interface CartItem {
	price: number,
	quantity: number,
	shipping: string,
}

interface Cart {
	[cartItemName: string]: CartItem
}

export const getCart = (): Cart => ({
	shoes: {
		price: 1000,
		quantity: 1,
		shipping: 'seoul',
	},
	tShort: {
		price: 1500,
		quantity: 2,
		shipping: 'my company',
	},
})
