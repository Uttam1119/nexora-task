import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCart, removeFromCart, updateCartItem } from "../api";

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
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">🛒 Your Cart</h2>

      {cartData.items.length === 0 ? (
        <div className="text-center text-gray-500 py-10 border rounded-lg shadow-sm">
          <p className="text-lg">Your cart is empty.</p>
          <p className="text-sm text-gray-400 mt-1">
            Add some products to see them here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {cartData.items.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition-all"
            >
              <div className="flex items-center space-x-4">
                {item.product?.image ? (
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                ) : (
                  <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                    N/A
                  </div>
                )}

                <div>
                  <h3 className="font-semibold text-gray-800">
                    {item.product ? item.product.name : "Product unavailable"}
                  </h3>
                  <div className="flex items-center space-x-3 mt-2">
                    <button
                      onClick={() => handleQtyChange(item._id, item.qty - 1)}
                      className="bg-gray-200 text-gray-700 rounded-md px-2 py-1 hover:bg-gray-300"
                    >
                      −
                    </button>
                    <span className="text-gray-800 font-medium">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => handleQtyChange(item._id, item.qty + 1)}
                      className="bg-gray-200 text-gray-700 rounded-md px-2 py-1 hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <p className="text-lg font-semibold text-gray-700">
                  {item.product ? `$${item.product.price * item.qty}` : "-"}
                </p>
                <button
                  onClick={() => handleRemove(item._id)}
                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {cartData.items.length > 0 && (
        <div className="mt-8 text-right border-t pt-4">
          <h3 className="text-xl font-bold text-gray-800">
            Total: <span className="text-blue-600">${cartData.total}</span>
          </h3>
          <button
            onClick={handleCheckout}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
