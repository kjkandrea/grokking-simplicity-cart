import array from './array';

describe('utils/array', () => {
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

  describe('array.pluck 는', () => {
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

  describe('array.dropFirst 는', () => {
    it('앞에서 부터 첫번째 아이템이 지워진 배열을 리턴한다.', () => {
      const newDoggies = array.dropFirst(doggies);
      expect(newDoggies.length).toBe(doggies.length - 1);
      const [firstDoggy] = newDoggies;
      expect(firstDoggy.name).toBe('retriever');
    });

    it('인자로 전달받은 원본 배열의 값을 변경하지 않는다.', () => {
      const newDoggies = array.dropFirst(doggies);
      const [corgi] = doggies;
      expect(corgi.name).toBe('corgi');
      expect(doggies !== newDoggies).toBe(true);
    });
  });
});
