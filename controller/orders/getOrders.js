const Order = require("../../models/order.model");
const formatOrderDataResponse = require("../../services/formatOrderDataResponse");

const getOrders = async (req, res) => {
  try {
    const per_page =
      !Boolean(req.query.per_page) || req.query.per_page < 1
        ? 20
        : req.query.per_page;
    const page =
      !Boolean(req.query.page) || req.query.page < 1 ? 1 : req.query.page;
    const total_items = await Order.find({ userId: req.user.id }).count();
    const orderList = await Order.find({ userId: req.user.id })
      .skip(per_page * (page - 1))
      .limit(per_page);
    res
      .status(200)
      .json({
        data: {
          items: orderList.map((data) => formatOrderDataResponse(data)),
          total_items,
          current_page: parseInt(page),
          per_page: parseInt(per_page),
          total_pages:
            parseInt(total_items / per_page) +
            parseInt(total_items % per_page ? 1 : 0),
        },
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = getOrders;
