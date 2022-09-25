import array from './array';
import object from './object';

describe('utils/array', () => {
  describe('array.pluck 는', () => {
    const doggies = [
      {
        name: 'corgi',
        age: 1,
      },
      {
        name: 'retriever',
        age: 2,
      },
    ];

    it('fieldName 을 통해 fieldName 의 value 를 통해 배열을 만든다.', () => {
      const doggyNames = array.pluck(doggies, 'name');
      expect(doggyNames.join()).toBe('corgi,retriever');
    });

    it('key 값이 존재하지 않는다면 undefined 가 담긴 배열을 반환한다.', () => {
      const doggyFirstNames = array.pluck(doggies, 'firstName' as any);
      expect(doggyFirstNames.every(firstName => firstName === undefined)).toBe(
        true
      );
    });
  });
});
