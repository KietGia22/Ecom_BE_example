const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
const getLimitPrice = require("../services/getLimitPrice");

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name can't be empty"],
    },
    min_price: {
      type: Number,
      required: true,
      min: 0,
    },
    max_price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      required: [true, "Description can't be empty"],
    },
    product_img: {
      type: String,
      validate: {
        validator: (value) => {
          return validator.isBase64(value);
        },
        message: `Product image must be base64`,
      },
    },
    size: [
      new Schema({
        name: { type: String, required: true },
        price: { type: Number, required: true, min: 0 },
        original_price: { type: Number, required: true, min: 0 },
        stock: { type: Number, required: true, min: 0 },
        product_img: {
          type: String,
          validate: {
            validator: (value) => {
              return validator.isBase64(value);
            },
            message: `Product image must be base64`,
          },
        },
      }),
    ],
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { collection: "product" }
);

productSchema.post("findOneAndUpdate", async function (doc) {
  const update = this.getUpdate();
  if (
    (update.$pull && update.$pull.size) ||
    (update.$push && update.$push.size) ||
    (update.$set &&
      (update.$set.size ||
        update.$set["size.$.price"] ||
        update.$set["size.$.stock"] ||
        update.$set["size.$.name"] ||
        update.$set["size.$.original_price"] ||
        update.$set["size.$.product_img"]))
  ) {
    const [min_price, max_price, stock] = getLimitPrice(doc.size);
    doc.min_price = min_price;
    doc.max_price = max_price;
    doc.stock = stock;
    await doc.save();
  }
});
module.exports = mongoose.model("Product", productSchema);
