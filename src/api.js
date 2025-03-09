import axios from 'axios';

const BASE_URL = '/api'; 

export const api = {
  // Fetch all products
  getProducts: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/products`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Add product to cart
  addToCart: async (productId, quantity = 1) => {
    try {
      const response = await axios.post(`${BASE_URL}/cart`, { 
        productId, 
        quantity 
      });
      return response.data;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  },

  // Update cart item quantity
  updateCartItemQuantity: async (cartItemId, quantity) => {
    try {
      const response = await axios.put(`${BASE_URL}/cart/update-quantity/${cartItemId}`, { 
        quantity 
      });
      return response.data;
    } catch (error) {
      console.error('Error updating cart item:', error);
      throw error;
    }
  },

  // Remove item from cart
  removeFromCart: async (cartItemId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/cart/${cartItemId}`);
      return response.data;
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  },

  // Place order
  placeOrder: async () => {
    try {
      const response = await axios.post(`${BASE_URL}/orders`);
      return response.data;
    } catch (error) {
      console.error('Error placing order:', error);
      throw error;
    }
  }
};

export default api;