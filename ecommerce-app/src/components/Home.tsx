// import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import ProductCard from '../components/ProductCard';

// function useCountdown(targetSeconds: number) {
//   const [seconds, setSeconds] = useState(targetSeconds);
//   useEffect(() => {
//     const id = setInterval(() => setSeconds(s => (s > 0 ? s - 1 : 0)), 1000);
//     return () => clearInterval(id);
//   }, []);
//   const h = Math.floor(seconds / 3600);
//   const m = Math.floor((seconds % 3600) / 60);
//   const s = seconds % 60;
//   return { h, m, s };
// }

export default function Home() {
//   const { h, m, s } = useCountdown(4 * 3600 + 23 * 60 + 45);
//   const topProducts = products.slice(0, 8);

  return (
    <main>
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-eyebrow">New Season Arrivals</span>
          <h1>
            Dress with<br />
            <em>intention.</em>
          </h1>
          <p>Thoughtfully sourced pieces that move with your life — from morning coffee to evening out.</p>
          <div className="hero-cta">
            <Link to="/shop" className="btn btn-primary">Shop now</Link>
            <Link to="/shop?cat=Women" className="btn btn-ghost">Women's edit</Link>
          </div>
        </div>
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80"
            alt="Fashion hero"
          />
          <div className="hero-badge-float">
            <span>New in</span>
            <strong>Summer '25</strong>
          </div>
        </div>
      </section>

      {/* Categories */}
      {/* <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Shop by category</h2>
            <Link to="/shop" className="see-all">View all →</Link>
          </div>
          <div className="categories-grid">
            {categories.map(cat => (
              <Link to={`/shop?cat=${cat.name}`} key={cat.id} className="category-card">
                <img src={cat.image} alt={cat.name} loading="lazy" />
                <div className="category-overlay">
                  <h3>{cat.name}</h3>
                  <span>{cat.count} items</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section> */}

      {/* Flash Sale */}
      {/* <section className="flash-sale-section">
        <div className="container">
          <div className="flash-header">
            <div>
              <h2>⚡ Flash Sale</h2>
              <p>Limited time — prices won't last.</p>
            </div>
            <div className="countdown">
              <div className="countdown-unit">
                <span>{String(h).padStart(2, '0')}</span>
                <label>hrs</label>
              </div>
              <span className="countdown-sep">:</span>
              <div className="countdown-unit">
                <span>{String(m).padStart(2, '0')}</span>
                <label>min</label>
              </div>
              <span className="countdown-sep">:</span>
              <div className="countdown-unit">
                <span>{String(s).padStart(2, '0')}</span>
                <label>sec</label>
              </div>
            </div>
          </div>
          <div className="products-grid">
            {flashSaleProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section> */}

      {/* Promo Banner */}
      {/* <section className="promo-banner">
        <div className="container">
          <div className="promo-grid">
            <div className="promo-card promo-dark">
              <span>Men's collection</span>
              <h3>Elevated essentials for every occasion</h3>
              <Link to="/shop?cat=Men" className="btn btn-white">Shop Men</Link>
            </div>
            <div className="promo-card promo-light">
              <span>Women's edit</span>
              <h3>Spring looks you'll actually wear</h3>
              <Link to="/shop?cat=Women" className="btn btn-dark">Shop Women</Link>
            </div>
          </div>
        </div>
      </section> */}

      {/* Top Products */}
      {/* <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Top products</h2>
            <Link to="/shop" className="see-all">See all →</Link>
          </div>
          <div className="products-grid">
            {topProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section> */}

      {/* New Arrivals */}
      {/* <section className="section bg-light">
        <div className="container">
          <div className="section-header">
            <h2>New arrivals</h2>
            <Link to="/shop?badge=new" className="see-all">See all →</Link>
          </div>
          <div className="products-grid">
            {newArrivals.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section> */}

      {/* Features */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            {[
              { icon: '🚚', title: 'Free shipping', desc: 'On all orders over $75' },
              { icon: '↩', title: 'Easy returns', desc: '30-day hassle-free returns' },
              { icon: '🔒', title: 'Secure checkout', desc: 'SSL encrypted payments' },
              { icon: '💬', title: 'Live support', desc: 'Chat with us 9am–6pm' },
            ].map(f => (
              <div key={f.title} className="feature-item">
                <span className="feature-icon">{f.icon}</span>
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}