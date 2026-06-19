import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Product from "../models/Product";

const products = [
  {
    id: 1,
    name: "Classic Leather Bag",
    price: 2499,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1200",
    category: ["Accessories", "Women"],
    description: "Minimal everyday bag with premium finish and clean structure.",
    rating: 4.6,
    featured: true
  },
  {
    id: 2,
    name: "White Sneakers",
    price: 3499,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200",
    category: ["Shoes", "Men", "Women"],
    description: "Comfortable sneakers with a crisp, modern look.",
    rating: 4.8,
    featured: true
  },
  {
    id: 3,
    name: "Oversized Shirt",
    price: 1799,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1200",
    category: ["Clothing", "Men"],
    description: "Relaxed fit shirt made for everyday styling.",
    rating: 4.4
  },
  {
    id: 4,
    name: "Men's Classic Shirt",
    price: 1499,
    image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=1200",
    category: ["Men", "Clothing"],
    description: "Clean regular-fit shirt for everyday wear.",
    rating: 4.5,
    featured: true
  },
  {
    id: 5,
    name: "Women's Tote Bag",
    price: 2199,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1200",
    category: ["Women", "Accessories"],
    description: "Minimal tote bag with a premium finish.",
    rating: 4.7,
    featured: true
  }
];

async function seedProducts() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    
    if (!mongoUri) {
      throw new Error("MONGO_URI is missing in .env");
    }
  
    await mongoose.connect(mongoUri);
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("Seed complete");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

export default seedProducts;