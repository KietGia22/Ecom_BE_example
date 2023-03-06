require("dotenv").config();
const Cart = require("../../models/cart.model");
const formatCartDataResponse = require("../../services/formatCartDataResponse");
const GetCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ _id: req.user.cart }).populate(
      "products.product"
    );
    res.status(200).json({
      data: formatCartDataResponse(cart),
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

module.exports = GetCart;
