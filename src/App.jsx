import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeIntro from "./pages/HomeIntro";
import Products from "./pages/Products";
import ProductDetailPage from "./components/productDetailPage"; // Import ProductDetailPage
import Cart from "./pages/Cart";
import CheckoutPage from "./components/checkoutPage";
import Header from "./components/Header";
import { useSelector } from "react-redux";

const App = () => {
  const products = useSelector((state) => state.products.filteredItems); // Adjust as needed

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomeIntro />} />
        <Route path="/products" element={<Products />} />
        <Route
          path="/products/:productId"
          element={<ProductDetailPage products={products} />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </Router>
  );
};

export default App;
