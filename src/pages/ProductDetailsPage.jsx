import Loader from "../component/Loader";
import ErrorMessage from "../component/ErrorMessage";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProductById } from "../store/productSlice";
import { useParams } from "react-router-dom";
import { addToCart } from "../store/cartSlice";

const ProductDetailsPage = () => {
  const id = useParams().id;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductById(id))
  }, [dispatch, id]);

  const { product, loading, error } = useSelector(
    (state) => state.products
  );

  const handleAddingCart = () => {
    dispatch(addToCart(product));
    alert("Added to the cart");
  }


  return (
    <div className="container py-4 text-light">
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <div className="row g-4">
          <div className="col-md-5 text-center">
            <img
              src={product.image}
              alt={product.title}
              className="img-fluid rounded shadow"
              style={{ height: "300px"}}
            />
          </div>

          <div className="col-md-7">
            <h3>{product.title}</h3>
            <h5 className="text-info fw-bold">${product.price}</h5>
            <p className="mt-3">{product.description}</p>

            <button className="btn btn-outline-light mt-3" onClick={handleAddingCart}>
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;
