const Cart = require("../../models/cart.model");
const deleteCartItem = async (req, res, next) => {
  try {
    const itemId = req.params.itemId;
    const cart = await Cart.findOne({ _id: req.user.cart }).populate(
      "products.product"
    );
    const indexDelete = cart.products.findIndex(
      (ele) => ele._id.toString() === itemId
    );
    if (indexDelete === -1)
      return res.status(404).json({ message: "Can't find item id for update" });
    cart.products.splice(indexDelete, 1);
    await cart.save();
    res.status(200).json({ message: "Delete item success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = deleteCartItem;
