import object from './object';

describe('utils/object', () => {
  describe('object.update 는', () => {
    const birdCount = {
      hawk: 5,
    };
    const increment = (count: number) => count + 1;

    it('modify 콜백 인자를 통해 값을 업데이트 한다.', () => {
      const newBirdCount = object.update(birdCount, 'hawk', increment);
      expect(newBirdCount.hawk).toBe(6);
    });

    it('key 값이 존재하지 않는다면 에러를 반환한다.', () => {
      expect(() =>
        object.update(birdCount, 'dog' as any, increment)
      ).toThrowError();
    });

    it('인자로 전달받은 원본 객체의 값을 변경하지 않는다.', () => {
      const newBirdCount = object.update(birdCount, 'hawk', increment);

      expect(birdCount.hawk).toBe(5);
      expect(birdCount !== newBirdCount).toBe(true);
    });
  });

  describe('object.nestedUpdate 는', () => {
    const speedUp = (speed: number) => speed + 10;

    it('keys 를 통해 변경 대상 값을 찾는다.', () => {
      const birds = {
        hawk: {
          speed: 100,
        },
      };

      let targetValue;
      object.nestedUpdate(birds, ['hawk', 'speed'], speed => {
        targetValue = speed;
        return speedUp(speed);
      });

      expect(targetValue).toBe(100);
    });
  });
});
