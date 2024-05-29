const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please add a provider name"],
    },
    importance: {
      type: String,
      enum: ["High", "Medium", "Low"],
      required: [true, "Please select the importance of the provider"],
    },
  },
  {timestamps: true}
);

module.exports = mongoose.model("Provider", providerSchema);
