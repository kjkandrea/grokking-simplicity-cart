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

## 타임라인 격리하기

타임라인 자원을 안전하게 공유하기 위해 동시성 기본형(concurrency primitive) 이라는 재사용 가능한 코드를 만드는 방법에 대해 배웁니다.

### `calc_cart_total`

```ts
function calc_cart_total(update_total_dom: (total: number) => void) {
    const cart = [...this.miniCartProducts]; // 암묵적 입력이 있습니다.
    
    this.total = 0; // 맴버 프로퍼티(전역)에 접근합니다.
    cost_ajax(cart, cost => {
        this.total = cost;
        shipping_ajax(cart, shipping => {
            this.total += shipping;
            update_total_dom(this.total);
        });
    })
}
```

#### 전역 변수를 인자로 바꾸기

암묵적 입력이 적은 액션을 만들기 위해 이를 적용해봅니다.

```ts
function calc_cart_total(
    cart: MiniCartProduct[], // cart를 인자로 추가합니다.
    update_total_dom: (total: number) => void
  ) {
    let total = 0; // 지역 변수로 바꿉니다.
    cost_ajax(cart, cost => {
      total = cost;
      shipping_ajax(cart, shipping => {
        total += shipping;
        update_total_dom(total);
      });
    });
  }
```

### 좋은 타임라인의 원칙

#### 1. 타임라인은 적을수록/짦을 수록 이해하기 쉽습니다.

타임라인 수를 줄이면 시스템은 이해하기 더 쉽습니다.\
하지만 타임라인 수를 언제나 마음대로 정할 수는 없습니다.

#### 2. 공유하는 자원이 적을수록 이해하기 쉽습니다.

타임라인을 볼때 자원을 공유하는 단계만 조심하면 됩니다.\
자원을 공유하는 단계를 줄이면 가능한 순서를 줄일 수 있습니다.

**자원 공유의 예**
* 전역 변수
* 맴버 프로퍼티
* DOM
* 전역 상태

#### 3. 자원을 공유한다면 서로 조율해야 합니다.

공유 자원을 많이 없앤다고 해도 여전히 없앨 수 없는 공유 자원이 남습니다.\
타임라인은 공유 자원을 안전하게 공유할 수 있어야합니다.

안전하게 공유한다는 말은 올바른 순서대로 자원을 쓰고 돌려준다는 말입니다.

#### 4. **🤩 시간을 일급으로 다룹니다.**

액션의 순서와 타이밍은 맞추기 어렵습니다.\
타임라인을 관리하는 재사용 가능한 객체를 만들면 타이밍 문제를 쉽게 처리할 수 있습니다.




