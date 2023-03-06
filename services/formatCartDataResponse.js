const formatProductDataResponse = require("./formatProductDataResponse");

const formatCartDataResponse = (cart) => {
  let items_total = 0;
  let formatData = {
    id: cart._id,
    grand_total: cart.grand_total,
    items_total: cart.items_total,
    discount_amount: cart.discount_amount,
    products: cart.products.map((data) => ({
      id: data._id,
      quantity: data.quantity,
      size_id: data.size_id,
      selected: data.selected,
      product: formatProductDataResponse(data.product, 0),
    })),
  };
  formatData.products = formatData.products.map((data) => {
    data.size = data.product.size.find(
      (ele) => ele.id.toString() === data.size_id.toString()
    );
    console.log(data.size);
    items_total += data.size.price * data.quantity;
    return data;
  });
  formatData.items_total = items_total;
  formatData.grand_total = items_total - formatData.discount_amount;
  return formatData;
};

module.exports = formatCartDataResponse;
