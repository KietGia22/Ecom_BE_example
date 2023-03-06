const removeDuplicateSize = (sizeList) => {
  if (sizeList === null || sizeList === undefined) return [];
  return sizeList.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.name === value.name)
  );
};

module.exports = removeDuplicateSize;
