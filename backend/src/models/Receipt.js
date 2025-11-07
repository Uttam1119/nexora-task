const mongoose = require("mongoose");

const receiptSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    total: { type: Number, required: true },
    items: [
      {
        product: { type: Object, required: true },
        qty: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Receipt", receiptSchema);
