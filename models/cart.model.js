const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema(
  {
    grand_total: { type: Number, required: true },
    items_total: { type: Number, required: true },
    discount_amount: { type: Number, required: true },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
        size_id: { type: Schema.Types.ObjectId, required: true },
        selected: { type: Boolean },
      },
    ],
  },
  { collection: "cart" }
);

module.exports = mongoose.model("Cart", CartSchema);
