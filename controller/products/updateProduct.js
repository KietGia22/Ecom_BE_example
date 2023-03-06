const Product = require("../../models/product.model");
const formatProductDataResponse = require("../../services/formatProductDataResponse");
const removeDuplicateSize = require("../../services/removeDuplicateSize");

const updateProduct = async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.params.id;
    const { name, description, rating, size } = req.body;
    const oldProduct = await Product.findOne({
      _id: productId,
      userId: userId,
    });
    if (oldProduct === null)
      return res.status(404).json({ message: "Can't find product" });
    let newData = {};
    if (Boolean(name)) newData.name = name;
    if (Boolean(description)) newData.description = description;
    if (Boolean(rating)) newData.rating = rating;
    if (Boolean(size)) newData.size = size;

    const updateProduct = await Product.findOneAndUpdate(
      { _id: productId, userId: userId },
      newData,
      { new: true }
    );

    res.status(200).json({
      message: "Update product success",
      data: formatProductDataResponse(updateProduct, 0),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = updateProduct;
