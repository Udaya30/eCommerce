import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import QuantitySelector from "../components/QuantitySelector";

export default function CartPage() {
  const { items, total, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout", { state: { cartItems: items } });
  };
  if (items.length === 0) {
    return (
      <section className="section empty-state">
        <h2>Your cart is empty</h2>
        <p>Start adding products to see them here.</p>
        <Link to="/shop" className="primary-btn">
          Go to Shop
        </Link>
      </section>
    );
  }

  return (
    <section className="section cart-page">
      <div className="section-header">
        <h2>Your Cart</h2>
        <button className="secondary-btn" onClick={clearCart}>
          Clear Cart
        </button>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {items.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
                <QuantitySelector
                  quantity={item.quantity}
                  onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
                  onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                />
              </div>
              <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                Remove
              </button>
            </div>
          ))}
        </div>

        <aside className="cart-summary">
          <h3>Order Summary</h3>
          <p>Total items: {items.reduce((sum, item) => sum + item.quantity, 0)}</p>
          <p>Total amount: ₹{total}</p>
          <button className="primary-btn" onClick={handleCheckout}>Checkout</button>
        </aside>
      </div>
    </section>
  );
}