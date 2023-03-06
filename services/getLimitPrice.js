const getLimitPrice = (sizeList) => {
  if (!sizeList.length) return [0, 0, 0];
  let min_price = sizeList[0].price,
    max_price = sizeList[0].price,
    stock = 0;
  sizeList.forEach((data) => {
    if (data.price > max_price) max_price = data.price;
    if (data.price < min_price) min_price = data.price;
    stock += data.stock;
  });
  return [min_price, max_price, stock];
};

module.exports = getLimitPrice;
