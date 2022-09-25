const array = {
  pluck<Item, Field extends keyof Item>(
    array: Item[],
    field: Field
  ): Item[Field][] {
    return array.map(item => item[field]);
  },
  dropFirst<Item>(array: Item[]) {
    const [_, ...newArray] = array;
    return newArray;
  },
};

export default array;
