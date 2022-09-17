const swallowCopy = {
    copy<T extends object>(object: T) {
        return {...object}
    },
    objectSet<T extends object>
    (object: T, key: keyof T, value: T[keyof T]) {
        const newObject = this.copy(object);
        newObject[key] = value;
        return newObject;
    }
}

export default swallowCopy;