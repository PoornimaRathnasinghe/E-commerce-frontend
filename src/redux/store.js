import { configureStore, createSlice } from '@reduxjs/toolkit';

// Products Slice
const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {
    fetchProductsStart: (state) => {
      state.loading = true;
    },
    fetchProductsSuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload;
    },
    fetchProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

// Cart Slice
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    total: 0,
    loading: false,
    error: null
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      state.total = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.total = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    updateQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
      state.total = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    }
  }
});

// Order Slice
const orderSlice = createSlice({
  name: 'order',
  initialState: {
    lastOrder: null,
    loading: false,
    error: null
  },
  reducers: {
    placeOrderStart: (state) => {
      state.loading = true;
    },
    placeOrderSuccess: (state, action) => {
      state.loading = false;
      state.lastOrder = action.payload;
    },
    placeOrderFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

// Create store
export const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    cart: cartSlice.reducer,
    order: orderSlice.reducer
  }
});

// Export actions
export const { 
  fetchProductsStart, 
  fetchProductsSuccess, 
  fetchProductsFailure 
} = productsSlice.actions;

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart 
} = cartSlice.actions;

export const { 
  placeOrderStart, 
  placeOrderSuccess, 
  placeOrderFailure 
} = orderSlice.actions;