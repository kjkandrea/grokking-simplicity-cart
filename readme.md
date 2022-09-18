# 일급 추상

## 함수 이름에 있는 암묵적 인자 드러내기

코드의 냄새

1. 거의 똑같이 구현된 함수가 있다.
2. 함수 이름이 구현에 있는 다른 부분을 가리킨다.

### 리팩터링 전

함수 이름에 있는 Price, Quantity, Tax 가 암묵적 인자입니다.

```js
setPriceByName(cart, 'shoe', 13);
setQuantityByName(cart, 'shoe', 3);
setTaxByName(cart, 'shoe', 2.34);
```

### 리팩터링 후

명시적인 인자를 추가합니다.

```js
setFieldByName(cart, 'shoe', 'price', 13);
```

### 일급인 것과 일급이 아닌것을 구별하기

중요한 것은 일급이 아닌 것을 일급으로 바꾸는 방법을 아는 것 입니다.

```js
setPriceByName(cart, 'shoe', 13);
```

함수 이름에 있는 `Price` 를 값처럼 쓸 수 있는 방법은 없습니다.\
함수명은 일급이 아니기 때문입니다.

그래서 함수명의 일부를 인자로 바꿔 일급으로 만들었습니다.

## 본문을 콜백으로 바꾸기

본문을 콜백으로 바꾸기(replace body with callback) 리팩터링은 중복을 없애는 것에 관한 리팩터링 입니다.\
고차 함수로 다양한 동작을 추상화 할 수 있습니다.

바뀌지 않는 부분을 일반화 하고,
실행해야 할 코드의 다른 부분을 함수의 인자로 넘기는 것입니다.

```js
function mapCart(mapper) {
    return Object.values(this.cart).map(mapper);
}

// ...
function totalPrice () {
    return this.mapCart(cartItem => cartItem.price).reduce((a, b) => a + b);
}
```
