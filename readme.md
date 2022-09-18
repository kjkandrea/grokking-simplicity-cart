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