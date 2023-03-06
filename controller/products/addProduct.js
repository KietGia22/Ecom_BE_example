require("dotenv").config();
const Product = require("../../models/product.model");
const formatProductDataResponse = require("../../services/formatProductDataResponse");
const getLimitPrice = require("../../services/getLimitPrice");
const removeDuplicateSize = require("../../services/removeDuplicateSize");

const addProduct = async (req, res) => {
  try {
    const userId = req.user._id;
    const productData = req.body;
    const { name, description } = productData;
    const size = removeDuplicateSize(productData.size);
    const [min_price, max_price, stock] = getLimitPrice(size);
    const newProduct = new Product({
      name: name,
      description: description,
      rating: 0,
      stock,
      max_price,
      min_price,
      size,
      userId: userId,
    });
    await newProduct.save();
    return res.status(200).json({
      message: "Add product success",
      data: formatProductDataResponse(newProduct, 0),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = addProduct;
