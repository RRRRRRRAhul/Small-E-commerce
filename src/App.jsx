import { Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";

import HomePage from "./Pages/HomePage";
import ProductDetailsPage from "./Pages/ProductDetailsPage";
import CartPage from "./Pages/CartPage";
import NotFoundPage from "./Pages/NotFoundPage";

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
