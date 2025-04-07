import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProductCard = memo(({ product, addToCart }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} className="product-image" />
      <h3 className="product-title">{product.title}</h3>
      <p className="product-price">${product.price}</p>
      <div className="product-actions">
        <Link to={`/products/${product.id}`} className="view-button">
          View Details
        </Link>
        <button 
          onClick={() => addToCart(product)} 
          className="add-to-cart-button"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
});

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired
  }).isRequired,
  addToCart: PropTypes.func.isRequired
};

export default ProductCard;