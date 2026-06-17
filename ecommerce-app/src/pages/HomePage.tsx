import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { type Product, getFeaturedProducts } from "../services/products";

export default function HomePage() {
  const [featured, setFeatured] = useState<Product[]>([]);

  useEffect(() => {
    getFeaturedProducts().then(setFeatured);
  }, []);

  return (
    <section className="section">
      {featured.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}