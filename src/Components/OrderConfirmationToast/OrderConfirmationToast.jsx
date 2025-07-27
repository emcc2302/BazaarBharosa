// src/Components/OrderConfirmationToast/OrderConfirmationToast.jsx
import React from 'react';
import './OrderConfirmationToast.css';
import { FaCheckCircle } from 'react-icons/fa';

const translations = {
  'English': {
    orderPlaced: "Order Placed Successfully!",
  },
  'Hindi': {
    orderPlaced: "ऑर्डर सफलतापूर्वक दिया गया!", // Order Safaltaapoorvak Diya Gaya!
  },
  'Bengali': {
    orderPlaced: "অর্ডার সফলভাবে দেওয়া হয়েছে!", // Order Safolbhabe Deoa Hoeche!
  }
};

export default function OrderConfirmationToast({ currentLanguage }) {
  const getTranslatedText = (key) => {
    return translations[currentLanguage]?.[key] || translations['English'][key];
  };

  return (
    <div className="order-confirmation-toast">
      <FaCheckCircle className="toast-icon" />
      <span className="toast-message">{getTranslatedText('orderPlaced')}</span>
    </div>
  );
}