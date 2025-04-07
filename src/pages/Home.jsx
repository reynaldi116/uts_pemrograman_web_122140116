import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Welcome to WebShop</h1>
        <p>Discover our amazing products at the best prices</p>
        <Link to="/products" className="cta-button">
          Shop Now
        </Link>
      </div>
      <div className="features-section">
        <div className="feature">
          <h2>Quality Products</h2>
          <p>We offer only the highest quality products</p>
        </div>
        <div className="feature">
          <h2>Fast Delivery</h2>
          <p>Get your orders delivered quickly</p>
        </div>
        <div className="feature">
          <h2>24/7 Support</h2>
          <p>Our support team is always here to help</p>
        </div>
      </div>
    </div>
  );
}

export default Home;

