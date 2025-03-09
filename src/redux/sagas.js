import { call, put, takeLatest, all } from 'redux-saga/core/effects';
import * as actions from './actions';
import api from '../api';

// Worker Sagas
function* fetchProductsSaga() {
  try {
    const products = yield call(api.getProducts);
    yield put(actions.fetchProductsSuccess(products));
  } catch (error) {
    yield put(actions.fetchProductsFailure(error.message));
  }
}

function* addToCartSaga(action) {
  try {
    const cartItem = yield call(api.addToCart, action.payload);
    yield put(actions.addToCartSuccess(cartItem));
  } catch (error) {
    yield put(actions.addToCartFailure(error.message));
  }
}

function* updateCartItemSaga(action) {
  try {
    const { cartItemId, newQuantity } = action.payload;
    const updatedItem = yield call(api.updateCartItemQuantity, cartItemId, newQuantity);
    yield put(actions.updateCartItemSuccess(updatedItem));
  } catch (error) {
    yield put(actions.updateCartItemFailure(error.message));
  }
}

function* removeFromCartSaga(action) {
  try {
    yield call(api.removeFromCart, action.payload);
    yield put(actions.removeFromCartSuccess(action.payload));
  } catch (error) {
    yield put(actions.removeFromCartFailure(error.message));
  }
}

function* placeOrderSaga() {
  try {
    const order = yield call(api.placeOrder);
    yield put(actions.placeOrderSuccess(order));
  } catch (error) {
    yield put(actions.placeOrderFailure(error.message));
  }
}

// Watcher Sagas
function* watchFetchProducts() {
  yield takeLatest(actions.fetchProductsRequest.type, fetchProductsSaga);
}

function* watchAddToCart() {
  yield takeLatest(actions.addToCartRequest.type, addToCartSaga);
}

function* watchUpdateCartItem() {
  yield takeLatest(actions.updateCartItemRequest.type, updateCartItemSaga);
}

function* watchRemoveFromCart() {
  yield takeLatest(actions.removeFromCartRequest.type, removeFromCartSaga);
}

function* watchPlaceOrder() {
  yield takeLatest(actions.placeOrderRequest.type, placeOrderSaga);
}

// Root Saga
export default function* rootSaga() {
  yield all([
    watchFetchProducts(),
    watchAddToCart(),
    watchUpdateCartItem(),
    watchRemoveFromCart(),
    watchPlaceOrder()
  ]);
}