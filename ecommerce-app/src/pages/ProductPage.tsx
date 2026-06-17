import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById, type Product } from "../services/products";

export default function ProductPage() {
  const { id } = useParams();
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

  return <div>{product.name}</div>;
}