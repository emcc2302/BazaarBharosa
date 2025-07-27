import React, { useState } from 'react';
import './CartModal.css';
import { FaTimes, FaPlus, FaMinus, FaTrash } from 'react-icons/fa';

const translations = {
  'English': {
    yourCart: "Your Cart",
    emptyCart: "Your cart is empty.",
    total: "Total:",
    proceedToCheckout: "Proceed to Checkout",
    addToCart: "Add to Cart",
    buyNow: "Buy Now",
    orderId: "Order ID:",
    date: "Date:",
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
    shippingAddress: "Shipping Address",
    street: "Street",
    city: "City",
    state: "State",
    zipCode: "Zip Code",
    country: "Country",
    provideAddress: "Please provide your shipping address."
  },
  'Hindi': {
    yourCart: "आपका कार्ट", // Aapka Cart
    emptyCart: "आपका कार्ट खाली है।", // Aapka cart khaali hai.
    total: "कुल:", // Kul
    proceedToCheckout: "चेकआउट के लिए आगे बढ़ें", // Checkout ke liye aage badhein
    addToCart: "कार्ट में जोड़ें", // Cart mein jodein
    buyNow: "अभी खरीदें", // Abhi khareedein
    orderId: "ऑर्डर आईडी:", // Order ID
    date: "दिनांक:", // Dinank
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
    shippingAddress: "शिपिंग पता", // Shipping Pata
    street: "गली", // Gali
    city: "शहर", // Shahar
    state: "राज्य", // Rajya
    zipCode: "पिन कोड", // Pin Code
    country: "देश", // Desh
    provideAddress: "कृपया अपना शिपिंग पता प्रदान करें।" // Kripya apna shipping pata pradaan karein.
  },
  'Bengali': {
    yourCart: "আপনার কার্ট",
    emptyCart: "আপনার কার্ট খালি।",
    total: "মোট:",
    proceedToCheckout: "চেকআউটে যান",
    addToCart: "কার্টে যোগ করুন",
    buyNow: "এখনই কিনুন",
    orderId: "অর্ডার আইডি:",
    date: "তারিখ:",
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
    shippingAddress: "শিপিং ঠিকানা",
    street: "রাস্তা",
    city: "শহর",
    state: "রাজ্য",
    zipCode: "পিন কোড",
    country: "দেশ",
    provideAddress: "অনুগ্রহ করে আপনার শিপিং ঠিকানা দিন।"
  }
};

export default function CartModal({ cartItems, onClose, onRemoveItem, onUpdateQuantity, currentLanguage, onPlaceOrder }) {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [address, setAddress] = useState({
    street: '', city: '', state: '', zipCode: '', country: ''
  });
  const [addressError, setAddressError] = useState('');

  const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const getTranslatedText = (key) => {
    return translations[currentLanguage]?.[key] || translations['English'][key];
  };

  const getTranslatedProductName = (item) => {
    return item.translations && item.translations[currentLanguage]
      ? item.translations[currentLanguage]
      : item.name;
  };

  const handleCheckoutClick = () => {
    if (cartItems.length === 0) {
      alert(getTranslatedText('emptyCart'));
      return;
    }
    setShowAddressForm(true);
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrderWithAddress = (e) => {
    e.preventDefault();
    setAddressError('');
    if (!address.street || !address.city || !address.state || !address.zipCode || !address.country) {
      setAddressError(getTranslatedText('provideAddress'));
      return;
    }

    if (onPlaceOrder) {
      onPlaceOrder(cartItems, "Cart Checkout", address);
      setAddress({ street: '', city: '', state: '', zipCode: '', country: '' });
      setShowAddressForm(false);
    }
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
            <>
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

              {showAddressForm ? (
                <div className="shipping-address-form">
                  <h3>{getTranslatedText('shippingAddress')}</h3>
                  {addressError && <p className="address-error-message">{addressError}</p>}
                  <form onSubmit={handlePlaceOrderWithAddress}>
                    <div className="form-group">
                      <label htmlFor="street">{getTranslatedText('street')}:</label>
                      <input type="text" id="street" name="street" value={address.street} onChange={handleAddressChange} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="city">{getTranslatedText('city')}:</label>
                      <input type="text" id="city" name="city" value={address.city} onChange={handleAddressChange} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="state">{getTranslatedText('state')}:</label>
                      <input type="text" id="state" name="state" value={address.state} onChange={handleAddressChange} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="zipCode">{getTranslatedText('zipCode')}:</label>
                      <input type="text" id="zipCode" name="zipCode" value={address.zipCode} onChange={handleAddressChange} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="country">{getTranslatedText('country')}:</label>
                      <input type="text" id="country" name="country" value={address.country} onChange={handleAddressChange} required />
                    </div>
                    <button type="submit" className="checkout-button">
                      {getTranslatedText('proceedToCheckout')}
                    </button>
                    <button type="button" className="back-to-cart-button" onClick={() => setShowAddressForm(false)}>
                      Back to Cart
                    </button>
                  </form>
                </div>
              ) : null}
            </>
          )}
        </div>

        {!showAddressForm && cartItems.length > 0 && (
          <div className="cart-modal-footer">
            <div className="cart-total">
              <span>{getTranslatedText('total')}</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>
            <button className="checkout-button" onClick={handleCheckoutClick}>
              {getTranslatedText('proceedToCheckout')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}