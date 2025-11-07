const axios = require("axios");
const mongoose = require("mongoose");
const Product = require("../models/Product");
require("dotenv").config();

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const { data } = await axios.get("https://fakestoreapi.com/products");

    const formatted = data.map((p) => ({
      name: p.title,
      price: p.price,
      image: p.image,
      description: p.description,
    }));

    await Product.insertMany(formatted);
    console.log("Products imported!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
