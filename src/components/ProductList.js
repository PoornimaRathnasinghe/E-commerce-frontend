import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsStart } from '../redux/store';

const ProductList = () => {
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector(state => state.products);

  useEffect(() => {
    const fetchProducts = () => async (dispatch) => {
      dispatch(fetchProductsStart());
      try {
        const response = await fetch('/api/Products'); 
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Products data received:', data);
        dispatch({ type: 'products/fetchProductsSuccess', payload: data });
      } catch (error) {
        console.error('Fetch products error:', error);
        dispatch({ type: 'products/fetchProductsFailure', payload: error.message });
      }
    };
    
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="container">
      <div className="product-list">
        {products && products.length > 0 ? (
          products.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-details">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">${product.price.toFixed(2)}</p>
                <p className="product-description">{product.description}</p>
                <p className="product-stock">
                  <span className={product.quantityInStock > 0 ? "in-stock" : "out-of-stock"}>
                    {product.quantityInStock > 0 
                      ? `In Stock: ${product.quantityInStock} items` 
                      : "Out of Stock"}
                  </span>
                </p>
              </div>
              <button 
                className="add-to-cart-btn"
                onClick={() => {
                  dispatch({
                    type: 'cart/addToCart',
                    payload: {
                      id: product.id,
                      productName: product.name,
                      price: product.price,
                      quantity: 1
                    }
                  });
                }}
                disabled={product.quantityInStock === 0}
              >
                {product.quantityInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>
          ))
        ) : (
          <div>No products available</div>
        )}
      </div>
    </div>
  );
};

export default ProductList;