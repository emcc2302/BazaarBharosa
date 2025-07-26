import React from 'react';
import './CartModal.css'; // Create this CSS file next
import { FaTimes, FaPlus, FaMinus, FaTrash } from 'react-icons/fa'; // Icons for close, add, minus, trash

export default function CartModal({ cartItems, onClose, onRemoveItem, onUpdateQuantity }) {
  const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="cart-modal-overlay" onClick={onClose}>
      <div className="cart-modal-content" onClick={(e) => e.stopPropagation()}> {/* Prevent clicks inside from closing */}
        <div className="cart-modal-header">
          <h2>Your Cart</h2>
          <button className="cart-modal-close-button" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="cart-modal-body">
          {cartItems.length === 0 ? (
            <p className="empty-cart-message">Your cart is empty.</p>
          ) : (
            <div className="cart-items-list">
              {cartItems.map((item, index) => (
                <div key={index} className="cart-item">
                  <img src={item.img} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h4 className="cart-item-name">{item.name}</h4>
                    <p className="cart-item-price">${item.price.toFixed(2)}</p>
                    <div className="cart-item-quantity-control">
                      <button onClick={() => onUpdateQuantity(item.name, item.quantity - 1)}>
                        <FaMinus />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.name, item.quantity + 1)}>
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                  <button className="cart-item-remove-button" onClick={() => onRemoveItem(item.name)}>
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-modal-footer">
            <div className="cart-total">
              <span>Total:</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            <button className="checkout-button">Proceed to Checkout</button>
          </div>
        )}
      </div>
    </div>
  );
}