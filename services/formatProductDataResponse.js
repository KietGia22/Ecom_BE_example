const formatSizeProductDataResponse = require("./formatSizeProductDataResponse");
const formatUserDataResponse = require("./formatUserDataResponse");

const formatProductDataResponse = (productData, needUser = 1) => {
  let data = {
    name: productData.name,
    description: productData.description,
    min_price: productData.min_price,
    max_price: productData.max_price,
    rating: productData.rating,
    stock: productData.stock,
    id: productData._id,
    size: formatSizeProductDataResponse(productData.size),
  };
  if (needUser) data.user = formatUserDataResponse(productData.userId);
  return data;
};

module.exports = formatProductDataResponse;
