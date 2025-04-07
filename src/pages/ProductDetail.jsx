import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoadingSpinner from '../components/LoadingSpinner';

function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  
  const imageRef = useRef(null);
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Product not found');
          }
          throw new Error('Failed to fetch product details');
        }
        
        const data = await response.json();
        setProduct(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);
  
  useEffect(() => {
    if (imageRef.current && product) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            imageRef.current.classList.add('visible');
            observer.disconnect();
          }
        },
        { threshold: 0.5 }
      );
      
      observer.observe(imageRef.current);
      return () => observer.disconnect();
    }
  }, [product]);
  
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };
  
  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity });
      navigate('/cart');
    }
  };
  
  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) return <LoadingSpinner />;
  
  if (error || !product) {
    return (
      <div className="error-message">
        <h2>Error</h2>
        <p>{error || 'Product not found'}</p>
        <button onClick={handleGoBack}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <button onClick={handleGoBack} className="back-button">
        &larr; Back
      </button>
      
      <div className="product-detail-content">
        <div className="product-image-container">
          <img 
            ref={imageRef} 
            src={product.image} 
            alt={product.title} 
            className="product-detail-image" 
          />
        </div>
        
        <div className="product-info">
          <h1>{product.title}</h1>
          <p className="product-price">${product.price}</p>
          <p className="product-category">Category: {product.category}</p>
          <div className="product-rating">
            Rating: {product.rating.rate} ({product.rating.count} reviews)
          </div>
          <p className="product-description">{product.description}</p>
          
          <div className="product-actions">
            <div className="quantity-selector">
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
              />
            </div>
            
            <button onClick={handleAddToCart} className="add-to-cart-button">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

ProductDetail.propTypes = {
  addToCart: PropTypes.func.isRequired
};

export default ProductDetail;