const formatSizeProductDataResponse = (sizeList) => {
  return sizeList.map((data) => ({
    id: data._id,
    name: data.name,
    price: data.price,
    original_price: data.original_price,
    stock: data.stock,
    product_img: data.product_img,
  }));
};

module.exports = formatSizeProductDataResponse;
