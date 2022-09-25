import array from './array';

interface DataObject {
  [key: string]: any;
}

function copy<T extends object>(object: T) {
  return {...object};
}

const object = {
  update<T extends DataObject>(
    object: T,
    key: keyof T,
    modify: (prev: T[keyof T]) => any
  ): T {
    if (!object[key]) {
      throw Error(`${key.toString()} 의 값이 존재하지 않습니다.`);
    }
    const value = object[key];
    const newValue = modify(value);
    return this.objectSet<T>(object, key, newValue);
  },
  nestedUpdate<T extends DataObject>(
    object: T,
    keys: string[],
    modify: (object: T) => any
  ): T {
    if (keys.length === 0) return modify(object);
    const [currentKey] = keys;
    const restOfKeys = array.dropFirst(keys);
    return this.update(object, currentKey, nestedObject => {
      return this.nestedUpdate(nestedObject, restOfKeys, modify);
    });
  },
  objectSet<T extends DataObject>(
    object: T,
    key: keyof T,
    value: T[keyof T]
  ): T {
    if (!object[key]) {
      throw Error(`${key.toString()} 의 값이 존재하지 않습니다.`);
    }
    const newObject = copy(object);
    newObject[key] = value;
    return newObject;
  },
};

export default object;
