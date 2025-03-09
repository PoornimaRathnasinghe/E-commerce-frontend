import { createReducer } from '@reduxjs/toolkit';
import * as actions from './actions';

// Products Reducer
export const productsReducer = createReducer(
  { 
    items: [], 
    loading: false, 
    error: null 
  }, 
  (builder) => {
    builder
      .addCase(actions.fetchProductsRequest, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(actions.fetchProductsSuccess, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(actions.fetchProductsFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
);

// Cart Reducer
export const cartReducer = createReducer(
  { 
    items: [], 
    loading: false, 
    error: null,
    total: 0
  }, 
  (builder) => {
    builder
      // Add to Cart
      .addCase(actions.addToCartRequest, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(actions.addToCartSuccess, (state, action) => {
        state.loading = false;
        const existingItem = state.items.find(item => item.id === action.payload.id);
        
        if (existingItem) {
          existingItem.quantity += action.payload.quantity;
        } else {
          state.items.push(action.payload);
        }
        
        // Recalculate total
        state.total = state.items.reduce((total, item) => 
          total + (item.price * item.quantity), 0);
      })
      .addCase(actions.addToCartFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update Cart Item
      .addCase(actions.updateCartItemRequest, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(actions.updateCartItemSuccess, (state, action) => {
        state.loading = false;
        const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
        
        if (itemIndex !== -1) {
          state.items[itemIndex] = action.payload;
        }
        
        // Recalculate total
        state.total = state.items.reduce((total, item) => 
          total + (item.price * item.quantity), 0);
      })
      .addCase(actions.updateCartItemFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Remove from Cart
      .addCase(actions.removeFromCartRequest, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(actions.removeFromCartSuccess, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(item => item.id !== action.payload);
        
        // Recalculate total
        state.total = state.items.reduce((total, item) => 
          total + (item.price * item.quantity), 0);
      })
      .addCase(actions.removeFromCartFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
);

// Order Reducer
export const orderReducer = createReducer(
  { 
    lastOrder: null, 
    loading: false, 
    error: null 
  }, 
  (builder) => {
    builder
      .addCase(actions.placeOrderRequest, (state) => {
        state.loading = true;
        state.error = null;
        state.lastOrder = null;
      })
      .addCase(actions.placeOrderSuccess, (state, action) => {
        state.loading = false;
        state.lastOrder = action.payload;
      })
      .addCase(actions.placeOrderFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
);