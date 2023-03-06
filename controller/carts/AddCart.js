require("dotenv").config();
const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");
const formatCartDataResponse = require("../../services/formatCartDataResponse");
const addCart = async (req, res) => {
  try {
    const productId = req.body.productId;
    await Product.findOne({ _id: productId });
    const sizeId = req.body.sizeId;
    const quantity = req.body.quantity || 1;
    const selected = req.body.selected || true;
    const newCart = await Cart.findOne({ _id: req.user.cart }).populate(
      "products.product"
    );
    const index = newCart.products.findIndex((ele) => {
      return (
        ele.product.id.toString() === productId &&
        ele.size_id.toString() === sizeId
      );
    });
    if (index !== -1) {
      newCart.products[index] = {
        product: productId,
        quantity,
        size_id: sizeId,
        selected,
      };
    } else {
      newCart.products.push({
        product: productId,
        quantity,
        size_id: sizeId,
        selected,
      });
    }
    await (await newCart.save()).populate("products.product");

    res.status(200).json({
      message: "Add new product to cart success",
      data: formatCartDataResponse(newCart),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = addCart;
