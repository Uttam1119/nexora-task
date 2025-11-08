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
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <button
        onClick={() => navigate("/")}
        className="font-bold text-xl flex items-center gap-2 hover:text-blue-300 transition"
      >
        🛒 <span>VibeCart</span>
      </button>

      <div className="space-x-6 text-sm font-medium">
        <Link to="/" className="hover:text-blue-300 transition">
          Products
        </Link>
        <Link to="/cart" className="hover:text-blue-300 transition">
          Cart
        </Link>
        <Link to="/checkout" className="hover:text-blue-300 transition">
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
