import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import { categories, getProducts, type Product, type ProductCategory } from "../services/products";

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>("All");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
  getProducts().then(data => {
    console.log("products:", data);
    setProducts(Array.isArray(data) ? data : []);
  });
}, []);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") return products;
    return products.filter(product => product.category.includes(selectedCategory));
  }, [products, selectedCategory]);

  return (
    <section className="section">
      <div className="filters">
        {categories.map(category => (
          <button
            key={category}
            className={selectedCategory === category ? "filter active" : "filter"}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}