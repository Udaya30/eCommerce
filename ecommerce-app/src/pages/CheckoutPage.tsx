import { useState, useEffect } from "react";
import { useNavigate, useLocation as useRouteLocation } from "react-router-dom";
import type { CartItem } from "../context/CartContext";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const location = useRouteLocation();
  const cartItems: CartItem[] = location.state?.cartItems || [];

  const [newLocation, setNewLocation] = useState("");
  const [savedLocation, setSavedLocation] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isCheckingUser, setIsCheckingUser] = useState(true);

  // Fetch user's saved location on mount
  useEffect(() => {
    let redirectTimer: number | undefined;

    const fetchUserLocation = async () => {
      try {
        const res = await fetch("/api/auth/user", {
          credentials: "include",
        });
        const data = await res.json();

        if (!res.ok) {
          if (res.status === 401) {
            setError("User not logged in");
            setIsCheckingUser(false);
            redirectTimer = window.setTimeout(() => navigate("/login"), 1000);
            return;
          }
          setError(data.message || "Failed to fetch user data");
          setIsCheckingUser(false);
          return;
        }

        if (data.user?.location) {
          setSavedLocation(data.user.location);
          setSelectedLocation(data.user.location);
        }
        setIsCheckingUser(false);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        console.error("Error fetching user location:", err);
        setError(`Unable to load user data: ${message}`);
        setIsCheckingUser(false);
      }
    };

    fetchUserLocation();

    return () => {
      if (redirectTimer) {
        window.clearTimeout(redirectTimer);
      }
    };
  }, [navigate]);

  const handleSaveLocation = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    const locationToSave = newLocation || selectedLocation;
    
    if (!locationToSave) {
      setError("Please enter or select a location");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/update-location`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ location: locationToSave }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to save location");
        return;
      }

      navigate("/payment", { state: { cartItems, selectedLocation: locationToSave } });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(`Error saving location: ${message}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (isCheckingUser) {
    return <p>Loading checkout page...</p>;
  }

  if (error === "User not logged in") {
    return (
      <section className="section empty-state">
        <h2>Please log in to checkout</h2>
        <button className="primary-btn" onClick={() => navigate("/login")}>
          Go to Login
        </button>
      </section>
    );
  }

  if (cartItems.length === 0) {
    return (
      <section className="section empty-state">
        <h2>No items to checkout</h2>
        <button className="primary-btn" onClick={() => navigate("/cart")}>
          Back to Cart
        </button>
      </section>
    );
  }

  return (
    <section className="section checkout-page">
      <div className="checkout-container">
        <h2>Checkout - Delivery Address</h2>

        <div className="order-summary" style={{ marginBottom: 24 }}>
          <h3>Order Summary</h3>
          <div style={{ maxHeight: 200, overflowY: "auto" }}>
            {cartItems.map((item: CartItem) => (
              <div key={item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span>{item.name} x{item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid #ccc", paddingTop: 8, marginTop: 8 }}>
            <strong>Total: ₹{cartItems.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0)}</strong>
          </div>
        </div>

        <form onSubmit={handleSaveLocation} className="location-form">
          {savedLocation ? (
            <div className="location-section">
              <h3>Your Saved Location</h3>
              <div className="location-option" style={{ marginBottom: 16, padding: 12, border: "1px solid #ddd", borderRadius: 4 }}>
                <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                  <input
                    type="radio"
                    name="location"
                    value={savedLocation}
                    checked={selectedLocation === savedLocation && !newLocation}
                    onChange={() => {
                      setSelectedLocation(savedLocation);
                      setNewLocation("");
                    }}
                  />
                  <span style={{ marginLeft: 8 }}>{savedLocation}</span>
                </label>
              </div>

              <h3>Or Enter New Location</h3>
              <input
                type="text"
                placeholder="Enter new delivery address"
                value={newLocation}
                onChange={(e) => {
                  setNewLocation(e.target.value);
                  if (e.target.value) {
                    setSelectedLocation("");
                  }
                }}
                style={{ 
                  width: "100%", 
                  padding: 8, 
                  marginBottom: 12, 
                  border: "1px solid #ddd", 
                  borderRadius: 4 
                }}
              />
            </div>
          ) : (
            <div className="location-section">
              <label htmlFor="location" style={{ display: "block", marginBottom: 8 }}>
                <strong>Enter Your Delivery Address</strong>
              </label>
              <textarea
                id="location"
                placeholder="Enter your full delivery address"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                style={{
                  width: "100%",
                  padding: 12,
                  marginBottom: 12,
                  border: "1px solid #ddd",
                  borderRadius: 4,
                  minHeight: 80,
                  fontFamily: "inherit",
                }}
              />
            </div>
          )}

          {error && <p style={{ color: "red", marginBottom: 12 }}>{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="primary-btn"
            style={{ width: "100%" }}
          >
            {loading ? "Processing..." : "Proceed to Payment"}
          </button>
        </form>

        <button
          onClick={() => navigate("/cart")}
          className="secondary-btn"
          style={{ width: "100%", marginTop: 12 }}
        >
          Back to Cart
        </button>
      </div>
    </section>
  );
}
