import { useEffect, useState } from "react";
import { getProducts, addToCart } from "../api";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((res) => setProducts(res.data));
  }, []);

  const handleAdd = async (productId) => {
    await addToCart({ productId, qty: 1 });
    alert("✅ Added to cart!");
  };

  return (
    <div className="flex flex-col items-center bg-gray-50 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        🛍️ Explore Our Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full max-w-7xl">
        {products.map((p) => (
          <div
            key={p._id}
            className="flex flex-col items-center bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 ease-in-out"
          >
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-52 object-cover rounded-t-2xl"
            />

            <div className="flex flex-col items-center text-center p-4 space-y-2 w-full">
              <h2 className="text-lg font-semibold text-gray-800">{p.name}</h2>
              <p className="text-gray-500 text-sm">Starting from</p>
              <p className="text-xl font-bold text-blue-600">${p.price}</p>

              <button
                onClick={() => handleAdd(p._id)}
                className="mt-4 w-4/5 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-xl transition-colors duration-200"
              >
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
