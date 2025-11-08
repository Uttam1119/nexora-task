import { useEffect, useState } from "react";
import { checkout, getCart } from "../api";

const Checkout = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [receipt, setReceipt] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState({ items: [], total: 0 });

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Full name is required.";
    if (!email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (cart.total === 0) {
      newErrors.form = "Your cart is empty. Please add some products first.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckout = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await checkout({
        name,
        email,
      });
      setReceipt(res.data.receipt);
    } catch (error) {
      console.error("Checkout error:", error);
      setErrors({
        form:
          error.response?.data?.error ||
          "Something went wrong during checkout. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Load cart data once
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await getCart();
        setCart(data);
      } catch (err) {
        console.error("Failed to load cart:", err);
      }
    };
    fetchCart();
  }, []);

  return (
    <div className="max-w-md mx-auto px-6 py-10 bg-white shadow-md rounded-xl mt-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        💳 Checkout
      </h2>

      {cart.items.length === 0 ? (
        <p className="text-gray-600 text-center">
          Your cart is empty.{" "}
          <a href="/" className="text-blue-600 underline">
            Shop now
          </a>
          .
        </p>
      ) : !receipt ? (
        <>
          <div className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`border p-3 w-full rounded-lg focus:outline-none focus:ring-2 ${
                  errors.name
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`border p-3 w-full rounded-lg focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {errors.form && (
              <p className="text-red-500 text-center text-sm">{errors.form}</p>
            )}

            <div className="text-gray-700 text-center font-medium">
              Total: ${cart.total}
            </div>

            <button
              onClick={handleCheckout}
              disabled={loading || cart.total === 0}
              className={`w-full py-3 rounded-lg text-white font-semibold transition ${
                loading || cart.total === 0
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Processing..." : "Complete Checkout"}
            </button>
          </div>
        </>
      ) : (
        <div className="mt-6 border-t pt-6 text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            ✅ Payment Successful!
          </h3>
          <p className="text-gray-600 mb-4">
            Thank you for your purchase,{" "}
            <span className="font-medium">{name}</span>!
          </p>

          <div className="bg-gray-50 p-4 rounded-lg border text-left">
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Total:</span> ${receipt.total}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Date:</span>{" "}
              {new Date(receipt.timestamp).toLocaleString()}
            </p>
          </div>

          <button
            onClick={() => (window.location.href = "/")}
            className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
