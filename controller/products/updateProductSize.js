const Product = require("../../models/product.model");
const formatProductDataResponse = require("../../services/formatProductDataResponse");

const updateProductSize = async (req, res) => {
  try {
    const userId = req.user._id;
    const sizeId = req.params.sizeId;
    const productId = req.body.productId;
    const { price, original_price, product_img, stock, name } =
      req.body.sizeData;
    const newValue = {};
    if (Boolean(price)) newValue["size.$.price"] = price;
    if (Boolean(stock)) newValue["size.$.stock"] = stock;
    if (Boolean(name)) newValue["size.$.name"] = name;
    if (Boolean(product_img)) newValue["size.$.product_img"] = product_img;
    if (Boolean(original_price))
      newValue["size.$.original_price"] = original_price;
    const updateProduct = await Product.findOneAndUpdate(
      {
        userId: userId,
        _id: productId,
        "size._id": sizeId,
      },
      {
        $set: newValue,
      },
      { new: true }
    );
    res.status(200).json({
      message: "Update size success",
      data: formatProductDataResponse(updateProduct, 0),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = updateProductSize;
