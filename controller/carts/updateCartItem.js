const formatCartDataResponse = require("../../services/formatCartDataResponse");
const Cart = require("../../models/cart.model");
const updateCartItem = async (req, res, next) => {
  try {
    const { quantity, selected } = req.body;
    const itemId = req.params.itemId;
    const cart = await Cart.findOne({ _id: req.user.cart }).populate(
      "products.product"
    );
    const indexUpdate = cart.products.findIndex(
      (ele) => ele._id.toString() === itemId
    );
    if (indexUpdate === -1)
      return res.status(404).json({ message: "Can't find item id for update" });
    if (quantity) cart.products[indexUpdate].quantity = quantity;
    if (selected !== undefined) cart.products[indexUpdate].selected = selected;
    await cart.save();
    res.status(200).json({
      message: "Updated cart successfully",
      data: formatCartDataResponse(cart),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = updateCartItem;
