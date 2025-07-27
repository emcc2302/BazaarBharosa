import React, { useState } from 'react';
import './TrackShipmentModal.css';
import { FaTimes, FaShippingFast, FaBoxOpen, FaTruck, FaCheckCircle, FaBan } from 'react-icons/fa';

const translations = {
  'English': {
    trackYourShipment: "Track Your Shipment",
    trackingId: "Tracking ID:",
    enterTrackingId: "Enter tracking ID",
    track: "Track",
    pleaseEnterId: "Please enter a tracking ID.",
    tracking: "Tracking...",
    idNotFound: "Tracking ID not found. Please try again.",
    status: "Status:",
    lastUpdate: "Last Update:",
    location: "Location:",
    estimatedDelivery: "Estimated Delivery:",
    orderId: "Order ID:",
    orderDate: "Order Date:", // Corrected key for consistency
    totalAmount: "Total Amount:",
    items: "Items:",
    quantity: "Qty:",
    price: "Price:",
    processing: "Processing",
    shipped: "Shipped",
    delivered: "Delivered",
    cancelled: "Cancelled",
    source: "Source:",
    shippingAddress: "Shipping Address"
  },
  'Hindi': {
    trackYourShipment: "अपने शिपमेंट को ट्रैक करें",
    trackingId: "ट्रैकिंग आईडी:",
    enterTrackingId: "ट्रैकिंग आईडी दर्ज करें",
    track: "ट्रैक करें",
    pleaseEnterId: "कृपया ट्रैकिंग आईडी दर्ज करें।",
    tracking: "ट्रैक किया जा रहा है...",
    idNotFound: "ट्रैकिंग आईडी नहीं मिली। कृपया पुनः प्रयास करें।",
    status: "स्थिति:",
    lastUpdate: "अंतिम अपडेट:",
    location: "स्थान:",
    estimatedDelivery: "अनुमानित डिलीवरी:",
    orderId: "ऑर्डर आईडी:",
    orderDate: "ऑर्डर दिनांक:",
    totalAmount: "कुल राशि:",
    items: "आइटम:",
    quantity: "मात्रा:",
    price: "मूल्य:",
    processing: "प्रसंस्करण",
    shipped: "भेजा गया",
    delivered: "पहुंचा दिया",
    cancelled: "रद्द",
    source: "स्रोत:",
    shippingAddress: "शिपिंग पता"
  },
  'Bengali': {
    trackYourShipment: "আপনার শিপমেন্ট ট্র্যাক করুন",
    trackingId: "ট্র্যাকিং আইডি:",
    enterTrackingId: "ট্র্যাকিং আইডি লিখুন",
    track: "ট্র্যাক করুন",
    pleaseEnterId: "অনুগ্রহ করে একটি ট্র্যাকিং আইডি লিখুন।",
    tracking: "ট্র্যাক করা হচ্ছে...",
    idNotFound: "ট্র্যাকিং আইডি পাওয়া যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।",
    status: "অবস্থা:",
    lastUpdate: "শেষ আপডেট:",
    location: "অবস্থান:",
    estimatedDelivery: "আনুমানিক ডেলিভারি:",
    orderId: "অর্ডার আইডি:",
    orderDate: "অর্ডার তারিখ:",
    totalAmount: "মোট পরিমাণ:",
    items: "পণ্য:",
    quantity: "পরিমাণ:",
    price: "দাম:",
    processing: "প্রক্রিয়াকরণ",
    shipped: "পাঠানো হয়েছে",
    delivered: "পৌঁছে দেওয়া হয়েছে",
    cancelled: "বাতিল",
    source: "উৎস:",
    shippingAddress: "শিপিং ঠিকানা"
  }
};

export default function TrackShipmentModal({ show, onClose, orders, currentLanguage }) {
  const [trackingId, setTrackingId] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);

  const getTranslatedText = (key) => {
    return translations[currentLanguage]?.[key] || translations['English'][key];
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Processing": return <FaBoxOpen className="status-icon processing" />;
      case "Shipped": return <FaTruck className="status-icon shipped" />;
      case "Delivered": return <FaCheckCircle className="status-icon delivered" />;
      case "Cancelled": return <FaBan className="status-icon cancelled" />;
      default: return null;
    }
  };

  const getTranslatedStatus = (status) => {
    const lowerStatus = status.toLowerCase();
    return getTranslatedText(lowerStatus);
  };

  const handleTrack = (e) => {
    e.preventDefault();
    if (!trackingId) {
      setTrackingResult({ message: getTranslatedText('pleaseEnterId'), type: "error" });
      return;
    }

    setTrackingResult({ message: getTranslatedText('tracking'), type: "loading" });

    setTimeout(() => {
      const foundOrder = orders.find(order =>
        order.orderId.toLowerCase() === trackingId.toLowerCase()
      );

      if (foundOrder) {
        setTrackingResult({ order: foundOrder, type: "found" });
      } else {
        setTrackingResult({ message: getTranslatedText('idNotFound'), type: "not_found" });
      }
    }, 1500);
  };

  if (!show) return null;

  return (
    <div className="track-shipment-modal-overlay" onClick={onClose}> {/* Overlay click closes modal */}
      <div className="track-shipment-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="track-shipment-modal-header">
          <h2>{getTranslatedText('trackYourShipment')}</h2>
          <button className="track-shipment-modal-close-button" onClick={onClose}> {/* Close button click closes modal */}
            <FaTimes />
          </button>
        </div>

        <div className="track-shipment-modal-body">
          <form onSubmit={handleTrack}>
            <div className="form-group">
              <label htmlFor="trackingId">{getTranslatedText('trackingId')}</label>
              <input
                type="text"
                id="trackingId"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder={getTranslatedText('enterTrackingId')}
                required
              />
            </div>
            <button type="submit" className="track-button">
              <FaShippingFast /> {getTranslatedText('track')}
            </button>
          </form>

          {trackingResult && (
            <div className={`tracking-status ${trackingResult.type}`}>
              {trackingResult.type === 'loading' && <p>{trackingResult.message}</p>}
              {trackingResult.type === 'error' && <p className="error-message">{trackingResult.message}</p>}
              {trackingResult.type === 'not_found' && <p className="error-message">{trackingResult.message}</p>}
              {trackingResult.type === 'found' && trackingResult.order && (
                <div className="tracking-details">
                  <h4>{getTranslatedText('orderId')} {trackingResult.order.orderId}</h4>
                  <p><strong>{getTranslatedText('orderDate')}</strong> {trackingResult.order.date}</p>
                  <p>
                    <strong>{getTranslatedText('status')}</strong>
                    <span className={`order-status-text status-${trackingResult.order.status.toLowerCase()}`}>
                       {getStatusIcon(trackingResult.order.status)} {getTranslatedStatus(trackingResult.order.status)}
                    </span>
                  </p>
                  {trackingResult.order.status !== 'Delivered' && (
                    <>
                      <p><strong>{getTranslatedText('lastUpdate')}</strong> {new Date().toLocaleString()}</p>
                      <p><strong>{getTranslatedText('location')}</strong> Transit Hub - {trackingResult.order.items[0]?.name || 'Unknown'} Region</p>
                      <p><strong>{getTranslatedText('estimatedDelivery')}</strong> {(new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)).toLocaleDateString()}</p>
                    </>
                  )}
                  {trackingResult.order.address && (
                    <div className="order-address">
                        <p><strong>{getTranslatedText('shippingAddress')}</strong></p>
                        <p>{trackingResult.order.address.street}</p>
                        <p>{trackingResult.order.address.city}, {trackingResult.order.address.state}</p>
                        <p>{trackingResult.order.address.zipCode}, {trackingResult.order.address.country}</p>
                    </div>
                  )}
                  <div className="order-items-summary">
                    <h4>{getTranslatedText('items')}</h4>
                    <ul>
                        {trackingResult.order.items.map((item, idx) => (
                            <li key={idx}>
                                <img src={item.img} alt={item.translatedName} />
                                <span>{item.translatedName} ({getTranslatedText('quantity')}: {item.quantity})</span>
                            </li>
                        ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}