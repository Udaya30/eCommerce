import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { itemCount } = useCart();

  return (
    <header className="navbar">
      <Link to="/" className="brand">
        MINI<span>SHOP</span>
      </Link>

      <nav className="navlinks">
        <NavLink to="/" className={({ isActive }: { isActive: boolean }) => (isActive ? "active" : "")}>
          Home
        </NavLink>
        <NavLink to="/shop" className={({ isActive }: { isActive: boolean }) => (isActive ? "active" : "")}>
          Shop
        </NavLink>
        <NavLink to="/cart" className={({ isActive }: { isActive: boolean }) => (isActive ? "active" : "")}>
          Cart <span className="cart-badge">{itemCount}</span>
        </NavLink>
      </nav>
    </header>
  );
}