// import { apiFetch } from "./api";

export type ProductCategory = "All" | "Men" | "Women" | "Accessories" | "Shoes" | "Clothing";
type AssignableProductCategory = Exclude<ProductCategory, "All">;

export type Product = {
  quantity: number;
  _id: string;
  id: number;
  name: string;
  price: number;
  image: string;
  category: AssignableProductCategory[];
  description: string;
  rating: number;
  featured?: boolean;
};

export const categories: ProductCategory[] = ["All", "Men", "Women", "Accessories", "Shoes", "Clothing"];

export type ProductFilter = {
  category?: string;
  featured?: boolean;
};

export async function getProducts() {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
// const data = await res.json();
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

// export async function getProducts(): Promise<Product[]> {
//   const baseUrl = import.meta.env.VITE_API_URL as string | undefined;

//   if (!baseUrl) {
//     return MOCK_PRODUCTS;
//   }

//   return apiFetch<Product[]>(`${baseUrl}/products`);
// }

export async function getProductById(id: number) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((product: { featured?: boolean }) => product.featured);
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const products = await getProducts();
  if (category === "All") return products;
  return products.filter((product: { category: AssignableProductCategory[] }) => product.category.includes(category as AssignableProductCategory));
}