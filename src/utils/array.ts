export const array = {
  pluck<Item, Field extends keyof Item>(
    array: Item[],
    fieldName: Field
  ): Item[Field][] {
    return array.map(item => item[fieldName]);
  },
  dropFirst<Item>(array: Item[]) {
    const [_, ...newArray] = array;
    return newArray;
  },
};
