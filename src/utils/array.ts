const array = {
  pluck<Item, Field extends keyof Item>(
    array: Item[],
    field: Field
  ): Item[Field][] {
    return array.map(item => item[field]);
  },
};

export default array;
