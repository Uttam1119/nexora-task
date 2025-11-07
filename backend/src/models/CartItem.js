const mongoose = require("mongoose");
const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  qty: { type: Number, default: 1 },
  userId: { type: String, default: "test-user-1" },
});
module.exports = mongoose.model("CartItem", cartItemSchema);
