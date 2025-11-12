import { Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";

import HomePage from "./pages/HomePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <>
      <div className="bg-dark min-vh-100 text-white">
        <Navbar />

        <div className="pt-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
