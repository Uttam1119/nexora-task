const CartItem = require("../models/CartItem");
const userId = "test-user-1";

exports.getCart = async (req, res) => {
  try {
    const items = await CartItem.find({ userId }).populate("product");
    const total = items.reduce(
      (sum, item) => sum + (item.product?.price || 0) * item.qty,
      0
    );
    res.json({ items, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { productId, qty = 1 } = req.body;
    if (!productId)
      return res.status(400).json({ error: "productId is required" });

    const existing = await CartItem.findOne({ product: productId, userId });

    if (existing) {
      existing.qty += qty;
      await existing.save();
      return res.json(existing);
    }

    const item = await CartItem.create({ product: productId, qty, userId });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { qty } = req.body;
    if (typeof qty !== "number")
      return res.status(400).json({ error: "qty must be a number" });

    const item = await CartItem.findOneAndUpdate(
      { _id: req.params.id, userId },
      { qty },
      { new: true }
    );

    if (!item) return res.status(404).json({ error: "Not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCartItem = async (req, res) => {
  try {
    const result = await CartItem.findOneAndDelete({
      _id: req.params.id,
      userId,
    });

    if (!result) return res.status(404).json({ error: "Not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
