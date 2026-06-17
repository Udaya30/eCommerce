import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, type Product } from "../services/products";
import ProductCard from "../components/ProductCard";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  if (!id) {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(false);
    return;
  }

  setLoading(true);
  getProductById(Number(id))
    .then(setProduct)
    .catch(console.error)
    .finally(() => setLoading(false));
}, [id]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <section className="section">
      <div style={{ marginBottom: 16 }}>
        <button className="secondary-btn" onClick={() => navigate("/shop")}>Back to Shop</button>
      </div>
      <div className="grid">
        <ProductCard key={product.id} product={product} />
      </div>
    </section>
  );
}