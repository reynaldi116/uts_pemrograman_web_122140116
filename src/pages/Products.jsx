import React, { useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import ProductList from '../components/ProductList';
import LoadingSpinner from '../components/LoadingSpinner';
import useDebounce from '../hooks/useDebounce';

function Products({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('https://fakestoreapi.com/products');
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      
      const data = await response.json();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);
  
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  
  const categories = useMemo(() => {
    const categoriesSet = new Set(products.map(product => product.category));
    return ['', ...Array.from(categoriesSet)];
  }, [products]);
  
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      const matchesCategory = categoryFilter === '' || product.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [products, debouncedSearchTerm, categoryFilter]);
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  if (loading) return <LoadingSpinner />;
  
  if (error) {
    return (
      <div className="error-message">
        <h2>Error loading products</h2>
        <p>{error}</p>
        <button onClick={fetchProducts}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="products-page">
      <h1>Products</h1>
      
      <div className="filters">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        
        <div className="category-filter">
          <select value={categoryFilter} onChange={handleCategoryChange}>
            <option value="">All Categories</option>
            {categories.slice(1).map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {filteredProducts.length > 0 ? (
        <ProductList products={filteredProducts} addToCart={addToCart} />
      ) : (
        <p>No products found matching your criteria</p>
      )}
    </div>
  );
}

Products.propTypes = {
  addToCart: PropTypes.func.isRequired
};

export default Products;