import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="section empty-state">
      <h2>Page not found</h2>
      <Link to="/" className="primary-btn">
        Back Home
      </Link>
    </section>
  );
}