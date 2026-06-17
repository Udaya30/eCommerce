import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import type { Product } from "../services/products";
import QuantitySelector from "./QuantitySelector";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const { items, addToCart, updateQuantity } = useCart();
  const cartItem = items.find(item => item.id === product.id);

  return (
    <article className="product-card">
        
      <Link to={product.id ? `/products/${product.id}` : "#"} className="product-image-wrap">
        <img src={product.image} alt={product.name} className="product-image" />
      </Link>

      <div className="product-content">
        <p className="product-category">{product.category}</p>
        <h3 className="product-title">{product.name}</h3>
        <p className="product-description">{product.description}</p>

        <div className="product-row">
          <strong>₹{product.price}</strong>
          <span>★ {product.rating}</span>
        </div>

        {!cartItem ? (
          <button className="primary-btn" onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        ) : (
          <QuantitySelector
            quantity={cartItem.quantity}
            onDecrease={() => updateQuantity(product.id, cartItem.quantity - 1)}
            onIncrease={() => updateQuantity(product.id, cartItem.quantity + 1)}
          />
        )}
      </div>
    </article>
    
  );
}