import { useDispatch } from "react-redux";
import { setSelectedCategory } from "../store/productSlice";

const CategoryFilter = ({ categories }) => {
  const dispatch = useDispatch();
  const handleCategoryClick = (category) => {
    dispatch(setSelectedCategory(category));
  };
  return (
    <div className="mb-4 d-flex gap-2 flex-wrap">
      {categories.map((cat, i) => (
        <button
          key={i}
          className={`btn ${
            setSelectedCategory === cat ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => handleCategoryClick(cat)}
        >
          {cat.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
