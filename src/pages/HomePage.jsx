import ProductCard from "../component/ProductCard";
import CategoryFilter from "../component/CategoryFilter";
import Loader from "../component/Loader";
import ErrorMessage from "../component/ErrorMessage";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProducts, fetchCategories } from "../store/productSlice";

const HomePage = () => {
  const dispatch = useDispatch();

  const { filteredProducts, loading, error, categories } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (filteredProducts.length === 0) {
      dispatch(fetchProducts());
    }
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, filteredProducts.length, categories.length]);

  return (
    <div className="container py-4 text-light">
      <h2 className="mb-4">Products</h2>

      <CategoryFilter categories={categories} />

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}

      <div className="row g-4">
        {filteredProducts.map((product) => (
          <div className="col-6 col-md-4 col-lg-3" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
