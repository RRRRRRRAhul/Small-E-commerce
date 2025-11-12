import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="card h-100 shadow-sm bg-dark text-light border-secondary">
      <img
        src={product.image}
        className="card-img-top p-3"
        alt={product.title}
        style={{ height: "200px", objectFit: "contain" }}
      />

      <div className="card-body d-flex flex-column">
        <h6 className="card-title">{product.title}</h6>
        <p className="text-info fw-bold">${product.price}</p>

        <Link
          to={`/product/${product.id}`}
          className="btn btn-outline-light mt-auto"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
