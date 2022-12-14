interface DataObject {
  [key: string]: any;
}

function copy<T extends object>(object: T) {
  return {...object};
}

function objectSet<T extends DataObject>(
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
}

export const object = {
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
    return objectSet<T>(object, key, newValue);
  },
  nestedUpdate<T extends DataObject>(
    object: T,
    keys: string[],
    modify: (object: any) => any
  ): T {
    if (keys.length === 0) return modify(object);
    const [currentKey, ...restOfKeys] = keys;
    return this.update(object, currentKey, nestedObject => {
      return this.nestedUpdate(nestedObject, restOfKeys, modify);
    });
  },
};
