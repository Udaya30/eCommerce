import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ name, email, password }),
    });

    const text = await res.text();
    const data = JSON.parse(text);

    if (!res.ok) {
      console.log(data);
      return;
    }

    console.log(data);
    navigate("/shop");
  };

  return (
    <section className="auth-landing">
        <h1 className="auth-landing-title">Sign Up</h1>
        <p className="auth-landing-subTitle">Create your account</p>
      <form className="auth-landing-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          className="auth-landing-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="auth-landing-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="auth-landing-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="auth-landing-button">Sign up</button>
      </form>
      <p className="auth-landing-subTitle">
        Already have an account? <Link to="/">Login</Link>
      </p>
    </section> 
  );
}