import object from './object';

describe('utils/object', () => {
  describe('object.update 는', () => {
    it('modify 콜백 인자를 통해 값을 업데이트 한다.', () => {
      const birdCount = {
        hawk: 5,
      };

      const newBirdCount = object.update(birdCount, 'hawk', count => count + 1);
      expect(newBirdCount.hawk).toBe(6);
    });

    it('key 값이 존재하지 않는다면 에러를 반환한다.', () => {
      const birdCount = {
        hawk: 5,
      };

      expect(() =>
        object.update(birdCount, 'dog' as any, count => count + 1)
      ).toThrowError();
    });

    it('인자로 전달받은 원본 객체의 값을 변경하지 않는다.', () => {
      const birdCount = {
        hawk: 5,
      };
      const newBirdCount = object.update(birdCount, 'hawk', count => count + 1);

      expect(birdCount.hawk).toBe(5);
      expect(birdCount !== newBirdCount).toBe(true);
    });
  });
});
