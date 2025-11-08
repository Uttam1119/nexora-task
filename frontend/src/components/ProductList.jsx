import { useEffect, useState } from "react";
import { getProducts, addToCart } from "../api";
import { ShoppingBag } from "lucide-react";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((res) => setProducts(res.data));
  }, []);

  const handleAdd = async (productId) => {
    await addToCart({ productId, qty: 1 });
    alert("🛍️ Added to cart!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-12 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      <div className="text-center mb-14">
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text drop-shadow-sm">
          Shop the Latest Trends
        </h1>
        <p className="text-gray-700 text-lg mt-3 max-w-2xl mx-auto">
          Discover curated collections of beautiful, premium products tailored
          just for you.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 w-full max-w-7xl">
        {products.map((p) => (
          <div
            key={p._id}
            className="relative bg-white/80 backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl border border-white/60 hover:shadow-2xl hover:-translate-y-2 hover:border-pink-200 transition-all duration-300"
          >
            <div className="overflow-hidden">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-60 object-cover transform hover:scale-110 transition-transform duration-500"
              />
            </div>

            <div className="flex flex-col items-center text-center p-6 space-y-3">
              <h2 className="text-xl font-semibold text-gray-800 hover:text-pink-600 transition-colors">
                {p.name}
              </h2>
              <p className="text-gray-500 text-sm">Starting from</p>
              <p className="text-2xl font-bold text-indigo-600">${p.price}</p>

              <button
                onClick={() => handleAdd(p._id)}
                className="mt-4 flex items-center justify-center gap-2 w-4/5 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:to-indigo-600 text-white font-semibold py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 active:scale-95"
              >
                <ShoppingBag className="w-5 h-5" />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
