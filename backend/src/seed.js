require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const products = [
    {
      name: "Vibe T‑shirt",
      price: 399,
      image:
        "https://veirdo.in/cdn/shop/files/b_0119493a-9927-4550-8323-baefe5f625c0.jpg?v=1759917565",
    },
    {
      name: "Groove Sneakers",
      price: 2599,
      image:
        "https://baccabucci.com/cdn/shop/files/1_0f99aa25-2a12-47f6-b011-a4a505dc44d3.jpg?v=1724830490",
    },
    {
      name: "Rhythm Cap",
      price: 299,
      image:
        "https://www.tablassurfshop.com/media/catalog/product/cache/15d0a4de533b1e2d2a7c737cc087380b/A/R/ART000130505001.jpg",
    },
    {
      name: "Beat Backpack",
      price: 1499,
      image:
        "https://cdn.thewirecutter.com/wp-content/media/2024/04/carryontravelbackpacks-2048px-0187.jpg?auto=webp&quality=75&width=1024",
    },
    {
      name: "Echo Headphones",
      price: 3499,
      image: "https://m.media-amazon.com/images/I/61EsgWPyvuL.jpg",
    },
  ];
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log("Seed complete");
  await mongoose.disconnect();
})();
