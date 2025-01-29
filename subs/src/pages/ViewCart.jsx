import { useCart } from "../pages/CartContext";
import { useNavigate } from "react-router-dom";
import "../styles/pages/cart.css";

const ViewCart = () => {
  const { cart, removeFromCart, getTotalPrice } = useCart();
  const navigate = useNavigate();

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="item">
                <span>{item.service} - {item.name} - ₹{item.price}</span>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <h3>Total: ₹{getTotalPrice().toFixed(2)}</h3>
          <button onClick={() => navigate("/payment")}>
            Proceed to Payment
          </button>
        </>
      )}
    </div>
  );
};

export default ViewCart;
