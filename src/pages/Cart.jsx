import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import CartItem from '../components/Cart';

function Cart({ cartItems, removeFromCart, updateQuantity }) {
  const navigate = useNavigate();
  
  const totalPrice = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    ).toFixed(2);
  }, [cartItems]);
  
  const handleCheckout = () => {
    alert('Checkout functionality would be implemented here');
    // In a real app, you would navigate to checkout page or process the order
  };

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h1>Your Cart is Empty</h1>
        <p>Looks like you haven't added any products to your cart yet.</p>
        <Link to="/products" className="continue-shopping">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Your Shopping Cart</h1>
      
      <div className="cart-items">
        {cartItems.map(item => (
          <CartItem
            key={item.id}
            item={item}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
          />
        ))}
      </div>
      
      <div className="cart-summary">
        <h3>Order Summary</h3>
        <div className="summary-row">
          <span>Items ({cartItems.reduce((sum, item) => sum + item.quantity, 0)}):</span>
          <span>${totalPrice}</span>
        </div>
        <div className="summary-row">
          <span>Shipping:</span>
          <span>Free</span>
        </div>
        <div className="summary-row total">
          <span>Total:</span>
          <span>${totalPrice}</span>
        </div>
        
        <button onClick={handleCheckout} className="checkout-button">
          Proceed to Checkout
        </button>
        
        <button onClick={() => navigate('/products')} className="continue-shopping">
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

Cart.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired
    })
  ).isRequired,
  removeFromCart: PropTypes.func.isRequired,
  updateQuantity: PropTypes.func.isRequired
};

export default Cart;