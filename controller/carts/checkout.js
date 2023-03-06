const Cart = require("../../models/cart.model");
const Order = require("../../models/order.model");
const formatCartDataResponse = require("../../services/formatCartDataResponse");
const formatOrderDataResponse = require("../../services/formatOrderDataResponse")
const checkout = async (req, res) => {
  try {
    const { payment_method } = req.body;
    if (payment_method !== "cash")
      return res
        .status(501)
        .json({ message: "Not support this payment method" });
    const findCart = await Cart.findOne({ _id: req.user.cart }).populate(
      "products.product"
    );
    if (!findCart.products.length)
      return res.status(404).json({ message: "Don't have items in your cart" });
    const cart = formatCartDataResponse(findCart);
    const order = new Order({
      grand_total: cart.grand_total,
      items_total: cart.items_total,
      discount_amount: cart.discount_amount,
      payment_method: payment_method,
      products: cart.products.map((data) => ({
        product: data.product,
        size: data.size,
        quantity: data.quantity,
      })),
      userId: req.user.id,
    });
    await order.save();
    findCart.grand_total = 0;
    findCart.items_total = 0;
    findCart.discount_amount = 0;
    findCart.products = [];
    await findCart.save();
    res.status(200).json({
      message: "Payment success",
      data: formatOrderDataResponse(order),
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = checkout;
