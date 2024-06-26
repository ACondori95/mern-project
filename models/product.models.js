const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please add a product name"],
      maxlength: 32,
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Please add a product description"],
      maxlength: 2000,
    },
    price: {
      type: Number,
      trim: true,
      required: [true, "Product must have a price"],
      maxlength: 32,
    },
    provider: {
      type: ObjectId,
      ref: "Provider",
      required: [true, "You must choose a provider"],
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: [true, "Product must belong to a category"],
    },
  },
  {timestamps: true}
);

module.exports = mongoose.model("Product", productSchema);
