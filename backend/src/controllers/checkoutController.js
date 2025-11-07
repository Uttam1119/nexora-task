const CartItem = require("../models/CartItem");
const Receipt = require("../models/Receipt");

exports.checkout = async (req, res) => {
  try {
    const { name, email, cartItems, userId = "guest_user" } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required." });
    }

    const items = await CartItem.find().populate("product");

    const total = items.reduce(
      (sum, item) => sum + (item.product?.price || 0) * item.qty,
      0
    );

    const receipt = await Receipt.create({
      name,
      email,
      userId,
      total,
      items,
    });

    await CartItem.deleteMany();

    res.json({
      receipt: {
        id: receipt._id,
        name: receipt.name,
        email: receipt.email,
        total: receipt.total,
        items: receipt.items,
        timestamp: receipt.createdAt,
      },
    });
  } catch (err) {
    console.error("Checkout error:", err);
    res.status(500).json({ error: err.message });
  }
};
