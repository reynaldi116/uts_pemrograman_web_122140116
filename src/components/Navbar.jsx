import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Navbar({ cartItemCount }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">WebShop</Link>
      </div>
      <div className="navbar-menu">
        <Link to="/" className="navbar-item">Home</Link>
        <Link to="/products" className="navbar-item">Products</Link>
        <Link to="/cart" className="navbar-item">
          Cart ({cartItemCount})
        </Link>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  cartItemCount: PropTypes.number.isRequired
};

export default Navbar;