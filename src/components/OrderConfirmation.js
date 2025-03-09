import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const OrderConfirmation = () => {
  const { lastOrder, loading, error } = useSelector(state => state.order);
  const navigate = useNavigate();

  useEffect(() => {
    
    if (!lastOrder && !loading && !error) {
      console.log("No order found, redirecting to home");
      navigate('/');
    }
  }, [lastOrder, loading, error, navigate]);

  if (loading) {
    return <div className="loading">Processing your order...</div>;
  }

  if (error) {
    return (
      <div className="order-error">
        <h2>Order Error</h2>
        <p>{error}</p>
        <button 
          className="continue-shopping-btn" 
          onClick={() => navigate('/')}
        >
          Return to Products
        </button>
      </div>
    );
  }

  if (!lastOrder) {
    return <div>No recent order found. Redirecting...</div>;
  }

  return (
    <div className="order-confirmation">
      <h2>Order Confirmation</h2>
      
      <div className="order-success-message">
        Your order has been placed successfully!
      </div>
      
      <div className="order-details">
        <p><strong>Order Number:</strong> #{lastOrder.id}</p>
        <p><strong>Order Date:</strong> {new Date(lastOrder.orderDate).toLocaleString()}</p>
        <p><strong>Total Price:</strong> ${lastOrder.totalPrice.toFixed(2)}</p>
        
        <h3>Order Items</h3>
        <table className="order-items-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {lastOrder.items.map(item => (
              <tr key={item.id}>
                <td>{item.productName}</td>
                <td>{item.quantity}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <button 
        className="continue-shopping-btn" 
        onClick={() => navigate('/')}
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default OrderConfirmation;