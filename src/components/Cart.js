import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateQuantity, removeFromCart, placeOrderStart, placeOrderSuccess, placeOrderFailure, clearCart } from '../redux/store';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: cartItems, total, loading, error } = useSelector(state => state.cart);
  const { loading: orderLoading } = useSelector(state => state.order);

  
  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
  
    try {
      dispatch(placeOrderStart());
      console.log("Dispatching placeOrderStart...");
  
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cartItems }) // Ensure correct payload
      });
  
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData);
      }
  
      const order = await response.json();
      console.log("Order response received:", order);
  
      dispatch(placeOrderSuccess(order));
      console.log("Dispatched placeOrderSuccess with:", order);
  
      dispatch(clearCart());
      navigate('/order-confirmation');
    } catch (error) {
      console.log("Order failed:", error);
      dispatch(placeOrderFailure(error.toString()));
    }
  };
  

  if (loading || orderLoading) return <div className="loading">Processing cart...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="container">
      <div className="cart">
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-details">
                  <span className="cart-item-name">{item.productName}</span>
                </div>
                <div>
                  <span>${item.price.toFixed(2)}</span>
                  <input 
                    type="number" 
                    min="1" 
                    value={item.quantity} 
                    className="cart-item-quantity"
                    onChange={(e) => {
                      const newQuantity = parseInt(e.target.value);
                      if (newQuantity > 0) {
                        dispatch(updateQuantity({
                          id: item.id,
                          quantity: newQuantity
                        }));
                      }
                    }}
                  />
                  <button 
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="cart-total">
              Total: ${total.toFixed(2)}
            </div>
            <button 
              className="checkout-btn"
              onClick={handleCheckout}
              disabled={cartItems.length === 0}
            >
              Place Order
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;