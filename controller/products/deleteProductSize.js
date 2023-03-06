const Product = require("../../models/product.model");

const deleteProductSize = async (req, res) => {
  try {
    const userId = req.user._id;
    const sizeId = req.params.sizeId;
    const productId = req.body.productId;
    const deleteProduct = await Product.findOneAndUpdate(
      {
        userId: userId,
        _id: productId,
      },
      {
        $pull: {
          size: { _id: sizeId },
        },
      },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Delete size success", data: deleteProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = deleteProductSize;
