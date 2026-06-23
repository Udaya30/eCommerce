import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import QRCode from "react-qr-code";
import type { CartItem } from "../context/CartContext";

type CheckoutState = {
  cartItems: CartItem[];
  selectedLocation: string;
  order?: {
    id: string;
    amount: number;
  };
};

type Merchant = {
  id: string;
  businessName: string;
  upiId: string;
  isActive: boolean;
};

export default function PaymentPage() {
  const location = useLocation();
  const state = location.state as CheckoutState | undefined;

  const cartItems = state?.cartItems || [];
  const amount =
    state?.order?.amount ||
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const [merchant, setMerchant] = useState<Merchant | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
  const loadMerchant = async () => {
    try {
      const merchantId = "6a34f04a583c79f675d48dc0";
      const url = `${import.meta.env.VITE_API_URL}/api/merchants/${merchantId}`;
      console.log("Fetching:", url);

      const res = await fetch(url);
      const data = await res.json();

      console.log("Status:", res.status);
      console.log("Response:", data);

      if (!res.ok) {
        setError(data.message || `Request failed with status ${res.status}`);
        return;
      }

      setMerchant(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Could not load merchant data");
    }
  };

  loadMerchant();
}, []);

  if (error) return <p>{error}</p>;
  if (!merchant) return <p>Loading payment details...</p>;

  if (!merchant.isActive || !merchant.upiId) {
    return <p>Merchant payment account is not active</p>;
  }

  const upiLink =
    `upi://pay?pa=${encodeURIComponent(merchant.upiId)}` +
    `&pn=${encodeURIComponent(merchant.businessName)}` +
    `&am=${amount.toFixed(2)}` +
    `&cu=INR` +
    // eslint-disable-next-line react-hooks/purity
    `&tn=${encodeURIComponent(state?.order?.id || `ORD-${Date.now()}`)}`;

  return (
    <div>
      <h1>Payment Page</h1>
      <p>Merchant: {merchant.businessName}</p>
      <p>Amount: ₹{amount.toFixed(2)}</p>
      <QRCode value={upiLink} />
    </div>
  );
}