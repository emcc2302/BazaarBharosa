// src/Components/HelpModal/HelpModal.jsx
import React from 'react';
import './HelpModal.css'; // Create this CSS file next
import { FaTimes, FaQuestionCircle, FaEnvelope, FaPhone } from 'react-icons/fa';

const translations = {
  'English': {
    helpCenter: "Help Center",
    faqTitle: "Frequently Asked Questions",
    faq1Q: "How do I place an order?",
    faq1A: "Browse products, add to cart, and proceed to checkout. Or use 'Buy Now' for direct purchase.",
    faq2Q: "How can I track my order?",
    faq2A: "Use the 'Track Shipment' option in the Navbar and enter your Order ID.",
    faq3Q: "What are the payment methods?",
    faq3A: "We accept various payment methods including credit/debit cards and UPI.",
    contactUs: "Contact Us",
    email: "Email:",
    phone: "Phone:",
    supportEmail: "support@bazaarbharosa.com",
    supportPhone: "+91 98765 43210"
  },
  'Hindi': {
    helpCenter: "सहायता केंद्र", // Sahayata Kendra
    faqTitle: "अक्सर पूछे जाने वाले प्रश्न", // Aksar Poochhe Jaane Vaale Prashn
    faq1Q: "मैं ऑर्डर कैसे दूं?", // Main Order Kaise Doon?
    faq1A: "उत्पाद ब्राउज़ करें, कार्ट में जोड़ें, और चेकआउट करें। या सीधे खरीदने के लिए 'अभी खरीदें' का उपयोग करें।", // Utpaad browse karein, cart mein jodein, aur checkout karein. Ya seedhe khareedne ke liye 'Abhi Khareedein' ka upyog karein.
    faq2Q: "मैं अपने ऑर्डर को कैसे ट्रैक कर सकता हूं?", // Main Apne Order Ko Kaise Track Kar Sakta Hoon?
    faq2A: "नेविगेशन बार में 'शिपमेंट ट्रैक करें' विकल्प का उपयोग करें और अपनी ऑर्डर आईडी दर्ज करें।", // Navigation bar mein 'Shipment Track Karein' vikalp ka upyog karein aur apni Order ID darj karein.
    faq3Q: "भुगतान के तरीके क्या हैं?", // Bhugtaan Ke Tareeke Kya Hain?
    faq3A: "हम क्रेडिट/डेबिट कार्ड और यूपीआई सहित विभिन्न भुगतान तरीके स्वीकार करते हैं।", // Hum credit/debit card aur UPI sahit vibhinn bhugtaan tareeke sveekar karte hain.
    contactUs: "हमसे संपर्क करें", // Hamse Sampark Karein
    email: "ईमेल:", // Email
    phone: "फ़ोन:", // Phone
    supportEmail: "support@bazaarbharosa.com",
    supportPhone: "+91 98765 43210"
  },
  'Bengali': {
    helpCenter: "সহায়তা কেন্দ্র", // Sahayata Kendra
    faqTitle: "সাধারণ জিজ্ঞাসা", // Sadharan Jiggasa
    faq1Q: "আমি কিভাবে অর্ডার দেবো?", // Ami Kibhabe Order Debo?
    faq1A: "পণ্য ব্রাউজ করুন, কার্টে যোগ করুন এবং চেকআউটে যান। অথবা সরাসরি কেনার জন্য 'এখনই কিনুন' ব্যবহার করুন।", // Ponno browse korun, carte jog korun ebong checkout-e jaan. Athoba sarasari kenar jonno 'Ekhuni Kinun' byabohar korun.
    faq2Q: "আমি আমার অর্ডার কিভাবে ট্র্যাক করব?", // Ami Amar Order Kibhabe Track Korbo?
    faq2A: "নেভিগেশন বারে 'শিপমেন্ট ট্র্যাক করুন' বিকল্পটি ব্যবহার করুন এবং আপনার অর্ডার আইডি লিখুন।", // Navigation bare 'Shipment Track Korun' bikolpoti byabohar korun ebong apnar order ID likhun.
    faq3Q: "পেমেন্টের পদ্ধতি কি কি?", // Paymenter Poddhoti Ki Ki?
    faq3A: "আমরা ক্রেডিট/ডেবিট কার্ড এবং ইউপিআই সহ বিভিন্ন পেমেন্ট পদ্ধতি গ্রহণ করি।", // Amra credit/debit card ebong UPI soho bibhinno payment poddhoti grohon kori.
    contactUs: "আমাদের সাথে যোগাযোগ করুন", // Amader Sathe Jogajog Korun
    email: "ইমেল:", // Email
    phone: "ফোন:", // Phone
    supportEmail: "support@bazaarbharosa.com",
    supportPhone: "+91 98765 43210"
  }
};

export default function HelpModal({ show, onClose, currentLanguage }) {
  const getTranslatedText = (key) => {
    return translations[currentLanguage]?.[key] || translations['English'][key];
  };

  if (!show) return null;

  return (
    <div className="help-modal-overlay" onClick={onClose}>
      <div className="help-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="help-modal-header">
          <h2>{getTranslatedText('helpCenter')}</h2>
          <button className="help-modal-close-button" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="help-modal-body">
          <section className="faq-section">
            <h3><FaQuestionCircle /> {getTranslatedText('faqTitle')}</h3>
            <div className="faq-item">
              <h4>{getTranslatedText('faq1Q')}</h4>
              <p>{getTranslatedText('faq1A')}</p>
            </div>
            <div className="faq-item">
              <h4>{getTranslatedText('faq2Q')}</h4>
              <p>{getTranslatedText('faq2A')}</p>
            </div>
            <div className="faq-item">
              <h4>{getTranslatedText('faq3Q')}</h4>
              <p>{getTranslatedText('faq3A')}</p>
            </div>
          </section>

          <section className="contact-section">
            <h3>{getTranslatedText('contactUs')}</h3>
            <p><FaEnvelope /> {getTranslatedText('email')} {getTranslatedText('supportEmail')}</p>
            <p><FaPhone /> {getTranslatedText('phone')} {getTranslatedText('supportPhone')}</p>
          </section>
        </div>
      </div>
    </div>
  );
}