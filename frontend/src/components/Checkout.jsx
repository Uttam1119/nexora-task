import { useEffect, useState } from "react";
import { getCart, checkout } from "../api";

const Checkout = () => {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState({});
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await getCart();
        setCart(data);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      }
    };
    fetchCart();
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Full name is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Please enter a valid email address.";
    if (cart.total === 0) newErrors.form = "Your cart is empty.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckout = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await checkout(form);
      setReceipt(res.data.receipt);
    } catch (err) {
      console.error("Checkout failed:", err);
      setErrors({
        form:
          err.response?.data?.error ||
          "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  if (receipt) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex items-center justify-center p-6">
        <div className="bg-white/90 backdrop-blur-lg border border-white/50 rounded-2xl shadow-2xl p-10 max-w-lg w-full text-center">
          <h3 className="text-3xl font-bold text-green-600 mb-2">
            ✅ Payment Successful!
          </h3>
          <p className="text-gray-700 mb-4">
            Thank you for your purchase,{" "}
            <span className="font-semibold">{form.name}</span>!
          </p>

          <div className="bg-gray-50 p-5 rounded-lg border text-left shadow-sm mb-6">
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
            className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl font-extrabold text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text mb-10 tracking-tight text-center">
        Checkout Summary
      </h1>

      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8">
        {/* Cart Summary */}
        <div className="w-full lg:w-2/3 bg-white/80 backdrop-blur-lg border border-white/50 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 flex flex-col">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Cart Summary
          </h2>

          <div className="grid grid-cols-4 text-gray-600 font-semibold border-b pb-3 mb-3 text-center">
            <span>Product</span>
            <span>Quantity</span>
            <span>Price</span>
            <span>Total</span>
          </div>

          <div className="flex-1 overflow-y-auto max-h-96">
            {cart.items.length === 0 ? (
              <p className="text-center text-gray-500 py-4">
                Your cart is empty 🛒
              </p>
            ) : (
              cart.items.map((item) => (
                <div
                  key={item._id}
                  className="grid grid-cols-4 items-center text-center py-3 border-b last:border-none hover:bg-gray-100/60 transition rounded-lg"
                >
                  <span className="font-medium text-gray-800">
                    {item.product?.name}
                  </span>
                  <span className="text-gray-600">(x{item.qty})</span>
                  <span className="text-gray-700 font-medium">
                    ${item.product?.price}
                  </span>
                  <span className="text-indigo-600 font-semibold">
                    ${item.product?.price * item.qty}
                  </span>
                </div>
              ))
            )}
          </div>

          <div className="grid grid-cols-4 mt-6 text-xl font-semibold text-gray-800 pr-7">
            <span className="col-span-3 text-left ml-7">Total Amount</span>
            <span className="text-indigo-600 font-semibold text-right mr-7">
              ${cart.total}
            </span>
          </div>
        </div>

        <div className="w-full lg:w-1/3 bg-white/80 backdrop-blur-lg border border-white/50 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Order Details
            </h2>
            <p className="text-gray-600 mb-6">
              Enter your details to confirm checkout.
            </p>

            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 ${
                    errors.name
                      ? "border-red-500 focus:ring-red-400"
                      : "border-gray-300 focus:ring-indigo-500"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 ${
                    errors.email
                      ? "border-red-500 focus:ring-red-400"
                      : "border-gray-300 focus:ring-indigo-500"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {errors.form && (
                <p className="text-red-500 text-center text-sm mt-2">
                  {errors.form}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={handleCheckout}
            disabled={loading || cart.items.length === 0}
            className={`mt-8 w-full ${
              loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:to-indigo-600"
            } text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95`}
          >
            {loading ? "Processing..." : "Confirm Checkout"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
