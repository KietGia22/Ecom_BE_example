const Product = require("../../models/product.model");
const formatProductDataResponse = require("../../services/formatProductDataResponse");

const getUserProduct = async (req, res) => {
  try {
    const per_page =
      !Boolean(req.query.per_page) || req.query.per_page < 1
        ? 20
        : req.query.per_page;
    const page =
      !Boolean(req.query.page) || req.query.page < 1 ? 1 : req.query.page;
    const userProduct = await Product.find({ userId: req.user._id })
      .skip(per_page * (page - 1))
      .limit(per_page);
    const productList = userProduct.map((data) =>
      formatProductDataResponse(data, 0)
    );
    const total_items = productList.length;
    res.status(200).json({
      data: {
        items: productList,
        total_items,
        current_page: parseInt(page),
        per_page: parseInt(per_page),
        total_pages:
          parseInt(total_items / per_page) +
          parseInt(total_items % per_page ? 1 : 0),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getUserProduct;
