const Product = require("../../models/product.model");
const formatProductDataResponse = require("../../services/formatProductDataResponse");

const addSizeProduct = async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.body.productId;
    const sizeData = req.body.sizeData;
    const { name, price, original_price, stock, product_img } = sizeData;
    const newProduct = await Product.findOneAndUpdate(
      {
        userId: userId,
        _id: productId,
      },
      {
        $push: {
          size: {
            name,
            price,
            original_price,
            stock,
            product_img,
          },
        },
      },
      { new: true }
    );

    res.status(200).json({
      message: "Add product size success",
      data: formatProductDataResponse(newProduct, 0),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = addSizeProduct;
