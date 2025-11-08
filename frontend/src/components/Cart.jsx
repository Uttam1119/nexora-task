import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCart, removeFromCart, updateCartItem } from "../api";
import { Trash2, ShoppingCart } from "lucide-react";

const Cart = () => {
  const [cartData, setCartData] = useState({ items: [], total: 0 });
  const navigate = useNavigate();

  const fetchCart = async () => {
    const res = await getCart();
    setCartData(res.data);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemove = async (id) => {
    await removeFromCart(id);
    fetchCart();
  };

  const handleQtyChange = async (id, newQty) => {
    if (newQty < 1) return;
    await updateCartItem(id, newQty);
    fetchCart();
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex flex-col items-center px-6 py-12">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-extrabold text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text">
          Your Shopping Cart
        </h2>
        <p className="text-gray-700 text-lg mt-2">
          Review your selected items and make them yours
        </p>
      </div>

      {cartData.items.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/60 p-10 w-full max-w-3xl">
          <ShoppingCart className="w-16 h-16 text-gray-400 mb-4" />
          <p className="text-lg text-gray-700 font-semibold">
            Your cart is empty.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Add some products to see them here.
          </p>
        </div>
      ) : (
        <>
          <div className="w-full max-w-5xl space-y-6">
            {cartData.items.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row items-center justify-between bg-white/80 backdrop-blur-lg border border-white/60 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-5"
              >
                <div className="flex items-center space-x-5 w-full sm:w-auto">
                  {item.product?.image ? (
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded-xl border border-gray-200"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                      N/A
                    </div>
                  )}

                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">
                      {item.product ? item.product.name : "Product unavailable"}
                    </h3>
                    <div className="flex items-center space-x-3 mt-2">
                      <button
                        onClick={() => handleQtyChange(item._id, item.qty - 1)}
                        className="bg-gray-200 text-gray-700 rounded-md px-3 py-1 hover:bg-gray-300 transition"
                      >
                        −
                      </button>
                      <span className="text-gray-800 font-medium text-lg">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => handleQtyChange(item._id, item.qty + 1)}
                        className="bg-gray-200 text-gray-700 rounded-md px-3 py-1 hover:bg-gray-300 transition"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto sm:space-x-8 mt-4 sm:mt-0">
                  <p className="text-lg font-semibold text-indigo-600">
                    {item.product ? `$${item.product.price * item.qty}` : "-"}
                  </p>
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="flex items-center gap-1 text-red-600 hover:text-red-700 font-medium text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 w-full max-w-5xl text-right border-t border-gray-200 pt-6">
            <h3 className="text-2xl font-bold text-gray-800">
              Total:{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-500">
                ${cartData.total}
              </span>
            </h3>
            <button
              onClick={handleCheckout}
              className="mt-6 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:to-indigo-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
