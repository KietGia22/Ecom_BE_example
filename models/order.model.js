const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    grand_total: { type: Number, required: true },
    items_total: { type: Number, required: true },
    discount_amount: { type: Number, required: true },
    payment_method: { type: String, required: true },
    products: [
      {
        product: { type: Object, required: true },
        quantity: { type: Number, required: true },
        size: { type: Object, required: true },
      },
    ],
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { collection: "order" }
);

module.exports = mongoose.model("Order", orderSchema);
