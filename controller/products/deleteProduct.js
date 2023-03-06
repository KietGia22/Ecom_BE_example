const Product = require("../../models/product.model");

const deleteProduct = async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.params.id;
    await Product.findByIdAndDelete({
      _id: productId,
      userId: userId,
    });
    res.status(200).json({ message: "Delete product success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = deleteProduct;
