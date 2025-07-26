import React from 'react';
import './CartModal.css';
import { FaTimes, FaPlus, FaMinus, FaTrash } from 'react-icons/fa';

// Define translations for static texts in CartModal
const translations = {
  'English': {
    yourCart: "Your Cart",
    emptyCart: "Your cart is empty.",
    total: "Total:",
    proceedToCheckout: "Proceed to Checkout",
    addToCart: "Add to Cart", // For consistency, though not used here
    buyNow: "Buy Now" // For consistency, though not used here
  },
  'Hindi': {
    yourCart: "आपका कार्ट", // Aapka Cart
    emptyCart: "आपका कार्ट खाली है।", // Aapka cart khaali hai.
    total: "कुल:", // Kul
    proceedToCheckout: "चेकआउट के लिए आगे बढ़ें", // Checkout ke liye aage badhein
    addToCart: "कार्ट में जोड़ें",
    buyNow: "अभी खरीदें"
  },
  'Bengali': {
    yourCart: "আপনার কার্ট", // Apnar Cart
    emptyCart: "আপনার কার্ট খালি।", // Apnar cart khali.
    total: "মোট:", // Mot
    proceedToCheckout: "চেকআউটে যান", // Checkout-e Jaan
    addToCart: "কার্টে যোগ করুন",
    buyNow: "এখনই কিনুন"
  }
};

export default function CartModal({ cartItems, onClose, onRemoveItem, onUpdateQuantity, currentLanguage }) {
  const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Function to get translated text for CartModal specific strings
  const getTranslatedText = (key) => {
    return translations[currentLanguage]?.[key] || translations['English'][key];
  };

  // Function to get translated product name (same logic as in Basic.jsx)
  const getTranslatedProductName = (item) => {
    // Ensure item.translations exists before accessing it
    return item.translations && item.translations[currentLanguage]
      ? item.translations[currentLanguage]
      : item.name;
  };

  return (
    <div className="cart-modal-overlay" onClick={onClose}>
      <div className="cart-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="cart-modal-header">
          <h2>{getTranslatedText('yourCart')}</h2>
          <button className="cart-modal-close-button" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="cart-modal-body">
          {cartItems.length === 0 ? (
            <p className="empty-cart-message">{getTranslatedText('emptyCart')}</p>
          ) : (
            <div className="cart-items-list">
              {cartItems.map((item, index) => (
                <div key={index} className="cart-item">
                  <img src={item.img} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h4 className="cart-item-name">{getTranslatedProductName(item)}</h4>
                    <p className="cart-item-price">₹{item.price.toFixed(2)}</p>
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
              <span>{getTranslatedText('total')}</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>
            <button className="checkout-button">{getTranslatedText('proceedToCheckout')}</button>
          </div>
        )}
      </div>
    </div>
  );
}