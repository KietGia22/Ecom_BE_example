const Product = require("../../models/product.model");
const formatProductDataResponse = require("../../services/formatProductDataResponse");

const getProductById = async (req, res) => {
  try {
    const productID = req.params.id;
    const productData = await Product.findOne({ _id: productID }).populate(
      "userId"
    );
    res.status(200).json({ data: formatProductDataResponse(productData) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getProductById;
