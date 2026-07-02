// import { useEffect, useState } from "react";
// import ProductCard from "../components/ProductCard";
// import { type, getFeaturedProducts } from "../services/products";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function HomePage() {
  // const [featured, setFeatured] = useState<Product[]>([]);

  // useEffect(() => {
  //   getFeaturedProducts().then(setFeatured);
  // }, []);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const text = await res.text();
    const data = JSON.parse(text);

    if (!res.ok) {
      console.log(data);
      setError(data.message || "Invalid password. Please try again");
      return;
    }

    console.log(data);
    navigate("/shop");
  };

  return (
    // <section className="section">
    //   {featured.map(product => (
    //     <ProductCard key={product.id} product={product} />
    //   ))}
    // </section>
    <section className="auth-landing">
      <h1 className="auth-landing-title">Welcome</h1>
      <p className="auth-landing-subTitle">Choose an option to continue.</p>

      <form className="auth-landing-form" onSubmit={handleSubmit}>
        <input className="auth-landing-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input className="auth-landing-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="auth-landing-button" type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p className="auth-landing-subTitle">
        New here? <Link to="/signup">Create an account</Link>
      </p>
    </section>
  );
}