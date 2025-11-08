import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-gradient-to-r from-pink-100 via-purple-100 to-pink-100 shadow-md p-4 flex justify-between items-center">
      <button
        onClick={() => navigate("/")}
        className="font-extrabold text-2xl flex items-center gap-2 text-green-700 hover:text-green-800 transition"
      >
        🛍️ <span>VibeCart</span>
      </button>

      <div className="space-x-8 text-base font-medium text-gray-800">
        <Link to="/" className="hover:text-purple-600 transition">
          Products
        </Link>
        <Link to="/cart" className="hover:text-purple-600 transition">
          Cart
        </Link>
        <Link to="/checkout" className="hover:text-purple-600 transition">
          Checkout
        </Link>
      </div>
    </nav>
  );
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
};

export default App;
