import { useSelector } from "react-redux";
import { removeFromCart } from "../store/cartSlice";
import { increaseQuantity } from "../store/cartSlice";
import { decreaseQuantity } from "../store/cartSlice";
import { clearCart } from "../store/cartSlice";
import { useDispatch } from "react-redux";

const CartPage = () => {
  // const cartItems = [
  //   {
  //     id: 1,
  //     title: "Dummy Product",
  //     price: 99,
  //     quantity: 2,
  //     image: "https://via.placeholder.com/100",
  //   },
  //   {
  //     id: 2,
  //     title: "Another Product",
  //     price: 150,
  //     quantity: 1,
  //     image: "https://via.placeholder.com/100",
  //   },
  // ];
  const dispatch = useDispatch();
  const { cartItems, totalQuantity, totalPrice } = useSelector(
    (state) => state.cart
  );
  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };
  const handleIncreaseCart = (id) => {
    dispatch(increaseQuantity(id));
  };
  const handleDecreaseCart = (id) => {
    dispatch(decreaseQuantity(id));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  }
  return (
    <div className="container py-4 text-light">
      <h2 className="mb-4">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-secondary">Your cart is empty</p>
      ) : (
        <ul className="list-group bg-dark">
          {cartItems.map((item) => (
            <li
              key={item.id}
              className="list-group-item d-flex justify-content-between align-items-center bg-dark text-light border-secondary"
            >
              {/* Product Image + Title */}
              <div className="d-flex align-items-center gap-3">
                <img
                  src={item.image}
                  alt={item.title}
                  width="60"
                  height="60"
                  style={{ objectFit: "contain" }}
                />
                <span>{item.title}</span>
              </div>

              {/* Price + Quantity Controls */}
              <div className="d-flex align-items-center gap-3">
                <button
                  className="btn btn-outline-light btn-sm"
                  onClick={() => handleDecreaseCart(item.id)}
                >
                  -
                </button>

                <span className="fw-bold">{item.quantity}</span>

                <button
                  className="btn btn-outline-light btn-sm"
                  onClick={() => handleIncreaseCart(item.id)}
                >
                  +
                </button>

                <span className="text-info fw-bold">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Total Price Section */}
      <div className="mt-4 text-end">
        <h4>
          Total Price: <span className="text-info">${totalPrice.toFixed(2)}</span>
        </h4>
        <p>
          Quantity: <span className="text-info">{totalQuantity}</span>
        </p>
        <button className="btn btn-warning mt-2" onClick={handleClearCart}>Clear Cart</button>
      </div>
    </div>
  );
};

export default CartPage;
