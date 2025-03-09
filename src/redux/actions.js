import { createAction } from '@reduxjs/toolkit';

// Product Actions
export const fetchProductsRequest = createAction('FETCH_PRODUCTS_REQUEST');
export const fetchProductsSuccess = createAction('FETCH_PRODUCTS_SUCCESS');
export const fetchProductsFailure = createAction('FETCH_PRODUCTS_FAILURE');

// Cart Actions
export const addToCartRequest = createAction('ADD_TO_CART_REQUEST');
export const addToCartSuccess = createAction('ADD_TO_CART_SUCCESS');
export const addToCartFailure = createAction('ADD_TO_CART_FAILURE');

export const updateCartItemRequest = createAction('UPDATE_CART_ITEM_REQUEST');
export const updateCartItemSuccess = createAction('UPDATE_CART_ITEM_SUCCESS');
export const updateCartItemFailure = createAction('UPDATE_CART_ITEM_FAILURE');

export const removeFromCartRequest = createAction('REMOVE_FROM_CART_REQUEST');
export const removeFromCartSuccess = createAction('REMOVE_FROM_CART_SUCCESS');
export const removeFromCartFailure = createAction('REMOVE_FROM_CART_FAILURE');

// Order Actions
export const placeOrderRequest = createAction('PLACE_ORDER_REQUEST');
export const placeOrderSuccess = createAction('PLACE_ORDER_SUCCESS');
export const placeOrderFailure = createAction('PLACE_ORDER_FAILURE');

// Async Action Creators
export const fetchProducts = () => async (dispatch) => {
  dispatch(fetchProductsRequest());
  try {
    const response = await fetch('/api/products');
    const products = await response.json();
    dispatch(fetchProductsSuccess(products));
  } catch (error) {
    dispatch(fetchProductsFailure(error.toString()));
  }
};

export const addToCart = (product, quantity = 1) => async (dispatch) => {
  dispatch(addToCartRequest());
  try {
    const response = await fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId: product.id,
        quantity,
        productName: product.name,
        price: product.price
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData);
    }
    
    const cartItem = await response.json();
    dispatch(addToCartSuccess(cartItem));
  } catch (error) {
    dispatch(addToCartFailure(error.toString()));
  }
};

export const updateCartItem = (cartItemId, newQuantity) => async (dispatch) => {
  dispatch(updateCartItemRequest());
  try {
    const response = await fetch(`/api/cart/update-quantity/${cartItemId}?newQuantity=${newQuantity}`, {
      method: 'PUT',
    });
    
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData);
    }
    
    const updatedCartItem = await response.json();
    dispatch(updateCartItemSuccess(updatedCartItem));
  } catch (error) {
    dispatch(updateCartItemFailure(error.toString()));
  }
};

export const removeFromCart = (cartItemId) => async (dispatch) => {
  dispatch(removeFromCartRequest());
  try {
    const response = await fetch(`/api/cart/${cartItemId}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData);
    }
    
    dispatch(removeFromCartSuccess(cartItemId));
  } catch (error) {
    dispatch(removeFromCartFailure(error.toString()));
  }
};

export const placeOrder = () => async (dispatch) => {
  dispatch(placeOrderRequest());
  try {
    const response = await fetch('/api/orders', {
      method: 'POST',
    });
    
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData);
    }
    
    const order = await response.json();
    dispatch(placeOrderSuccess(order));
  } catch (error) {
    dispatch(placeOrderFailure(error.toString()));
  }
};