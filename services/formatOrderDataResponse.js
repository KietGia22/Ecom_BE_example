const formatOrderDataResponse = (order) => {
  return {
    grand_total: order.grand_total,
    items_total: order.items_total,
    discount_amount: order.discount_amount,
    payment_method: order.payment_method,
    products: order.products.map((data) => ({
      product: data.product,
      size: data.size,
      quantity: data.quantity,
      id: data._id,
    })),
    userId: order.userId,
    id: order._id,
  };
};

module.exports = formatOrderDataResponse;
