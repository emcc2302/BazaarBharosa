// src/Components/BuyNowAddressModal/BuyNowAddressModal.jsx
import React, { useState } from 'react';
import './BuyNowAddressModal.css'; // Create this CSS file next
import { FaTimes } from 'react-icons/fa';

const translations = {
  'English': {
    shippingAddress: "Shipping Address",
    street: "Street",
    city: "City",
    state: "State",
    zipCode: "Zip Code",
    country: "Country",
    provideAddress: "Please provide your shipping address.",
    confirmOrder: "Confirm Order", // New text for the button
    back: "Back"
  },
  'Hindi': {
    shippingAddress: "शिपिंग पता",
    street: "गली",
    city: "शहर",
    state: "राज्य",
    zipCode: "पिन कोड",
    country: "देश",
    provideAddress: "कृपया अपना शिपिंग पता प्रदान करें।",
    confirmOrder: "ऑर्डर की पुष्टि करें", // Order ki pushti karein
    back: "वापस" // Vaapas
  },
  'Bengali': {
    shippingAddress: "শিপিং ঠিকানা",
    street: "রাস্তা",
    city: "শহর",
    state: "রাজ্য",
    zipCode: "পিন কোড",
    country: "দেশ",
    provideAddress: "অনুগ্রহ করে আপনার শিপিং ঠিকানা দিন।",
    confirmOrder: "অর্ডার নিশ্চিত করুন", // Order Nishchit Korun
    back: "ফিরে যান" // Fire Jaan
  }
};

export default function BuyNowAddressModal({ show, onClose, product, onPlaceOrder, currentLanguage }) {
  const [address, setAddress] = useState({
    street: '', city: '', state: '', zipCode: '', country: ''
  });
  const [addressError, setAddressError] = useState('');

  const getTranslatedText = (key) => {
    return translations[currentLanguage]?.[key] || translations['English'][key];
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleConfirmOrder = (e) => {
    e.preventDefault();
    setAddressError('');
    if (!address.street || !address.city || !address.state || !address.zipCode || !address.country) {
      setAddressError(getTranslatedText('provideAddress'));
      return;
    }

    if (onPlaceOrder && product) {
      // Place order for the single item with quantity 1
      onPlaceOrder([{ ...product, quantity: 1 }], "Buy Now", address);
      setAddress({ street: '', city: '', state: '', zipCode: '', country: '' }); // Clear form
      onClose(); // Close modal
    }
  };

  if (!show) return null;

  return (
    <div className="buy-now-address-modal-overlay" onClick={onClose}>
      <div className="buy-now-address-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="buy-now-address-modal-header">
          <h2>{getTranslatedText('shippingAddress')}</h2>
          <button className="buy-now-address-modal-close-button" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="buy-now-address-modal-body">
          {addressError && <p className="address-error-message">{addressError}</p>}
          <form onSubmit={handleConfirmOrder}>
            <div className="form-group">
              <label htmlFor="buyNowStreet">{getTranslatedText('street')}:</label>
              <input type="text" id="buyNowStreet" name="street" value={address.street} onChange={handleAddressChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="buyNowCity">{getTranslatedText('city')}:</label>
              <input type="text" id="buyNowCity" name="city" value={address.city} onChange={handleAddressChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="buyNowState">{getTranslatedText('state')}:</label>
              <input type="text" id="buyNowState" name="state" value={address.state} onChange={handleAddressChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="buyNowZipCode">{getTranslatedText('zipCode')}:</label>
              <input type="text" id="buyNowZipCode" name="zipCode" value={address.zipCode} onChange={handleAddressChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="buyNowCountry">{getTranslatedText('country')}:</label>
              <input type="text" id="buyNowCountry" name="country" value={address.country} onChange={handleAddressChange} required />
            </div>
            <button type="submit" className="confirm-order-button">
              {getTranslatedText('confirmOrder')}
            </button>
            <button type="button" className="back-button" onClick={onClose}>
              {getTranslatedText('back')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}