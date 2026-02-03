import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCartStore();

  const totalPrice = getTotalPrice();

  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your Cart is Empty</h2>
        <p>Add some products to your cart to see them here.</p>
        <button 
          onClick={() => navigate('/category')}
          className="continue-shopping-btn"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      
      <div className="cart-content">
        <div className="cart-items">
          {items.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} className="cart-item-image" />
              
              <div className="cart-item-details">
                <h3>{item.title}</h3>
                <p className="cart-item-price">${item.price}</p>
                <p className="cart-item-rating">Rating: {item.rating}/5</p>
              </div>

              <div className="cart-item-actions">
                <div className="quantity-controls">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span className="quantity-display">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>

                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>

              <div className="cart-item-total">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Shipping:</span>
            <span>Free</span>
          </div>

          <div className="summary-row total">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          <button className="checkout-btn">
            Proceed to Checkout
          </button>

          <button 
            onClick={clearCart}
            className="clear-cart-btn"
          >
            Clear Cart
          </button>

          <button 
            onClick={() => navigate('/category')}
            className="continue-shopping-btn"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;