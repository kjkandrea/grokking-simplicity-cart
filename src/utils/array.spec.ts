import array from './array';

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
  });
});
