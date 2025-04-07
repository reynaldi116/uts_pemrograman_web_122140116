import React from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';

function ProductList({ products, addToCart }) {
  return (
    <div className="product-list">
      {products.map(product => (
        <ProductCard 
          key={product.id} 
          product={product} 
          addToCart={addToCart} 
        />
      ))}
    </div>
  );
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired
    })
  ).isRequired,
  addToCart: PropTypes.func.isRequired
};

export default ProductList;