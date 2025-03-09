import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { items: cartItems } = useSelector(state => state.cart);
  const navigate = useNavigate();
  
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="header">
      <div className="container header-content">
        <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <span>Shop</span><span style={{ color: '#4293d4' }}>Blue</span>
        </div>
        <button 
          className="cart-button" 
          onClick={() => navigate('/cart')}
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="cart-icon"
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          <span className="cart-text">Cart</span>
        </button>
      </div>
    </header>
  );
};

export default Header;