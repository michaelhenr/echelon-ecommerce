import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useCart } from '../contexts/CartContext';
import { FaShoppingCart, FaTrash, FaMinus, FaPlus } from 'react-icons/fa';

const Cart = () => {
  const { items, total, updateCartItem, removeFromCart, clearCart } = useCart();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateCartItem(productId, newQuantity);
    }
  };

  if (items.length === 0) {
    return (
      <>
        <Helmet>
          <title>Shopping Cart - Echelon Ecommerce</title>
          <meta name="description" content="Your shopping cart" />
        </Helmet>

        <div className="cart-page products-background">
          <div className="container">
            <div className="cart-header">
              <h1>Shopping Cart</h1>
            </div>
            
            <div className="empty-cart">
              <FaShoppingCart className="empty-cart-icon" />
              <h2>Your cart is empty</h2>
              <p>Add some products to get started!</p>
              <a href="/products" className="btn btn-primary">
                Continue Shopping
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Shopping Cart - Echelon Ecommerce</title>
        <meta name="description" content="Your shopping cart" />
      </Helmet>

      <div className="cart-page products-background">
        <div className="container">
          <div className="cart-header">
            <h1>Shopping Cart</h1>
            <p>{items.length} item(s) in your cart</p>
          </div>

          <div className="cart-content">
            <div className="cart-items">
              {items.map(item => (
                <div key={item.product._id} className="cart-item">
                  <div className="item-image">
                    <img
                      src={item.product.images?.[0]?.url || '/placeholder-product.jpg'}
                      alt={item.product.name}
                    />
                  </div>
                  
                  <div className="item-details">
                    <h3>{item.product.name}</h3>
                    <p className="item-brand">{item.product.brand}</p>
                    <p className="item-price">${item.product.price}</p>
                  </div>

                  <div className="item-quantity">
                    <button
                      onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                      className="quantity-btn"
                    >
                      <FaMinus />
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                      className="quantity-btn"
                    >
                      <FaPlus />
                    </button>
                  </div>

                  <div className="item-total">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product._id)}
                    className="remove-btn"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="summary-card">
                <h2>Order Summary</h2>
                
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                
                <div className="summary-row">
                  <span>Tax</span>
                  <span>$0.00</span>
                </div>
                
                <div className="summary-row total">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <div className="summary-actions">
                  <button className="btn btn-primary btn-full">
                    Proceed to Checkout
                  </button>
                  <button
                    onClick={clearCart}
                    className="btn btn-outline btn-full"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
