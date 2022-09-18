const swallowCopy = {
  copy<T extends object>(object: T) {
    return {...object};
  },
  withObjectCopy<T extends object>(object: T, modify: (object: T) => void) {
    const newObject = this.copy(object);
    modify(newObject);
    return newObject;
  },
  objectSet<T extends object>(object: T, key: keyof T, value: T[keyof T]) {
    return this.withObjectCopy(object, object => {
      object[key] = value;
    });
  },
};

export default swallowCopy;
