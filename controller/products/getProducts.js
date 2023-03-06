const Product = require("../../models/product.model");
const formatProductDataResponse = require("../../services/formatProductDataResponse");

const getProducts = async (req, res) => {
  try {
    const per_page =
      !Boolean(req.query.per_page) || req.query.per_page < 1
        ? 20
        : req.query.per_page;
    const page =
      !Boolean(req.query.page) || req.query.page < 1 ? 1 : req.query.page;
    const sort_price = req.query.sort_price;
    const total_items = await Product.count();
    let productList;
    if (sort_price !== undefined)
      productList = await Product.find()
        .populate("userId")
        .skip(per_page * (page - 1))
        .limit(per_page)
        .sort({ max_price: sort_price });
    else
      productList = await Product.find()
        .populate("userId")
        .skip(per_page * (page - 1))
        .limit(per_page);
    res.status(200).json({
      data: {
        items: productList.map((data) => formatProductDataResponse(data)),
        total_items,
        current_page: parseInt(page),
        per_page: parseInt(per_page),
        total_pages:
          parseInt(total_items / per_page) +
          parseInt(total_items % per_page ? 1 : 0),
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = getProducts;
