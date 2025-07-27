import React from 'react';
import './MyOrdersModal.css';
import { FaTimes, FaBoxOpen, FaTruck, FaCheckCircle, FaBan } from 'react-icons/fa';

const translations = {
  'English': {
    myOrders: "My Orders",
    noOrders: "You haven't placed any orders yet.",
    orderId: "Order ID:",
    date: "Order Date:",
    totalAmount: "Total Amount:",
    status: "Status:",
    items: "Items:",
    quantity: "Qty:",
    price: "Price:",
    subtotal: "Subtotal:",
    processing: "Processing",
    shipped: "Shipped",
    delivered: "Delivered",
    cancelled: "Cancelled",
    source: "Source:",
    shippingAddress: "Shipping Address"
  },
  'Hindi': {
    myOrders: "मेरे आदेश", // Mere Aadesh
    noOrders: "आपने अभी तक कोई आदेश नहीं दिया है।", // Aapne abhi tak koi aadesh nahin diya hai.
    orderId: "ऑर्डर आईडी:", // Order ID
    date: "ऑर्डर दिनांक:", // Order Dinank
    totalAmount: "कुल राशि:", // Kul Rashi
    status: "स्थिति:", // Sthiti
    items: "आइटम:", // Item
    quantity: "मात्रा:", // Matra
    price: "मूल्य:", // Moolya
    subtotal: "उपयोग:", // Upyog
    processing: "प्रसंस्करण", // Prasanskaran
    shipped: "भेजा गया", // Bheja Gaya
    delivered: "पहुंचा दिया", // Pahuncha Diya
    cancelled: "रद्द", // Radd
    source: "स्रोत:", // Srot
    shippingAddress: "शिपिंग पता" // Shipping Pata
  },
  'Bengali': {
    myOrders: "আমার অর্ডার",
    noOrders: "আপনি এখনো কোনো অর্ডার দেননি।",
    orderId: "অর্ডার আইডি:",
    date: "তারিখ:",
    totalAmount: "মোট পরিমাণ:",
    status: "অবস্থা:",
    items: "পণ্য:",
    quantity: "পরিমাণ:",
    price: "দাম:",
    subtotal: "উপমোট:",
    processing: "প্রক্রিয়াকরণ",
    shipped: "পাঠানো হয়েছে",
    delivered: "পৌঁছে দেওয়া হয়েছে",
    cancelled: "বাতিল",
    source: "উৎস:",
    shippingAddress: "শিপিং ঠিকানা"
  }
};

export default function MyOrdersModal({ show, onClose, orders, currentLanguage }) {
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


  if (!show) return null;

  return (
    <div className="my-orders-modal-overlay" onClick={onClose}>
      <div className="my-orders-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="my-orders-modal-header">
          <h2>{getTranslatedText('myOrders')}</h2>
          <button className="my-orders-modal-close-button" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="my-orders-modal-body">
          {orders.length === 0 ? (
            <p className="no-orders-message">{getTranslatedText('noOrders')}</p>
          ) : (
            <div className="orders-list">
              {orders.map((order) => (
                <div key={order.orderId} className="order-card">
                  <div className="order-summary">
                    <p><strong>{getTranslatedText('orderId')}</strong> {order.orderId}</p>
                    <p><strong>{getTranslatedText('date')}</strong> {order.date}</p>
                    <p><strong>{getTranslatedText('totalAmount')}</strong> ₹{order.totalAmount.toFixed(2)}</p>
                    <p>
                      <strong>{getTranslatedText('status')}</strong>
                      <span className={`order-status-text status-${order.status.toLowerCase()}`}>
                        {getStatusIcon(order.status)} {getTranslatedStatus(order.status)}
                      </span>
                    </p>
                    <p><strong>{getTranslatedText('source')}</strong> {order.source}</p>
                    {order.address && (
                      <div className="order-address-summary">
                          <p><strong>{getTranslatedText('shippingAddress')}</strong></p>
                          <p>{order.address.street}</p>
                          <p>{order.address.city}, {order.address.state}</p>
                          <p>{order.address.zipCode}, {order.address.country}</p>
                      </div>
                    )}
                  </div>
                  <div className="order-items">
                    <h4>{getTranslatedText('items')}</h4>
                    <ul>
                      {order.items.map((item, itemIdx) => (
                        <li key={itemIdx}>
                          <img src={item.img} alt={item.translatedName} className="order-item-image" />
                          <div className="order-item-details">
                            <span>{item.translatedName}</span>
                            <span>{getTranslatedText('quantity')}: {item.quantity}</span>
                            <span>{getTranslatedText('price')}: ₹{item.price.toFixed(2)}</span>
                            <span>{getTranslatedText('subtotal')}: ₹{(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}