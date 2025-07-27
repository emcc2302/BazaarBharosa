import React from "react";
import './Basic.css';

const translations = {
  'English': {
    vendorHeading: "Vendor",
    addToCart: "Add to Cart",
    buyNow: "Buy Now",
    proceedToBuy: "Proceeding to buy",
    noProductsFound: "No products found matching your search.",
  },
  'Hindi': {
    vendorHeading: "विक्रेता", // Vikreta
    addToCart: "कार्ट में जोड़ें", // Cart mein jodein
    buyNow: "अभी खरीदें", // Abhi khareedein
    proceedToBuy: "खरीदने के लिए आगे बढ़ रहे हैं", // Kharidne ke liye aage badh rahe hain
    noProductsFound: "आपकी खोज से मेल खाने वाले कोई उत्पाद नहीं मिले।", // Aapki khoj se mel khaane vaale koi utpaad nahin mile.
  },
  'Bengali': {
    vendorHeading: "বিক্রেতা", // Bikreta
    addToCart: "কার্টে যোগ করুন", // Carte Jog Korun
    buyNow: "এখনই কিনুন", // Ekhuni Kinun
    proceedToBuy: "এখনই কিনতে এগিয়ে যাচ্ছি", // Ekhuni Kinte Egie Jachhi
    noProductsFound: "আপনার অনুসন্ধানের সাথে মেলে এমন কোনো পণ্য পাওয়া যায়নি।", // Apnar onushandhaner sathe mele emon kono ponno paoya jayni.
  }
};


const spices = [
  { name: "Saffron Threads", price: 14, img: "https://images.unsplash.com/photo-1643471672168-f4a4b6cfa440?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", translations: { 'Hindi': "केसर के धागे", 'Bengali': "জাফরান সুতা" } },
  { name: "Tellicherry Black Peppercorns", price: 14, img: "https://plus.unsplash.com/premium_photo-1726072357017-0af7b90a463d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", translations: { 'Hindi': "टेलिचेरी काली मिर्च", 'Bengali': "টেলিচেরি কালো গোলমরিচ" } },
  { name: "Turmeric Powder", price: 14, img: "https://images.unsplash.com/photo-1702041295331-840d4d9aa7c9?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", translations: { 'Hindi': "हल्दी पाउडर", 'Bengali': "হলুদ গুঁড়ো" } },
  { name: "Black Sesame", price: 16, img: "https://plus.unsplash.com/premium_photo-1667773301057-65909aa87b95?q=80&w=968&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", translations: { 'Hindi': "काला तिल", 'Bengali': "কালো তিল" } },
  { name: "Pink Pepper", price: 16, img: "https://i0.wp.com/madagascar-market.com/wp-content/uploads/2017/10/36.jpg?fit=680%2C453&ssl=1", translations: { 'Hindi': "गुलाबी मिर्च", 'Bengali': "গোলাপী গোলমরিচ" } },
  { name: "Paprika", price: 18, img: "https://images.unsplash.com/photo-1669863347362-1630fe821708?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", translations: { 'Hindi': "पपरिका", 'Bengali': "পেপারিকা" } },
  { name: "Cucumber", price: 18, img: "https://images.unsplash.com/photo-1568584711271-6c929fb49b60?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", translations: { 'Hindi': "खीरा", 'Bengali': "শসা" } },
  { name: "Chilli", price: 18, img: "https://images.unsplash.com/photo-1546860255-95536c19724e?q=80&w=708&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", translations: { 'Hindi': "मिर्च", 'Bengali': "লঙ্কা" } },
  { name: "Coriander", price: 18, img: "https://images.unsplash.com/photo-1535189487909-a262ad10c165?q=80&w=1099&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", translations: { 'Hindi': "धनिया", 'Bengali': "ধনে" } },
  { name: "Ginger", price: 18, img: "https://images.unsplash.com/photo-1603431777782-912e3b76f60d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", translations: { 'Hindi': "अदरक", 'Bengali': "আদা" } },
  { name: "Garlic", price: 18, img: "https://images.unsplash.com/reserve/E6Ai8EoSQp2unXHEd1GA_GarlicHarvest.jpg?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", translations: { 'Hindi': "लहसुन", 'Bengali': "রসুন" } },
  { name: "Onion", price: 18, img: "https://images.unsplash.com/photo-1642582037312-9b9639be89e6?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", translations: { 'Hindi': "प्याज", 'Bengali': "পেঁয়াজ" } },
  { name: "Potato", price: 18, img: "https://images.unsplash.com/photo-1590165482129-1b8b27698780?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", translations: { 'Hindi': "आलू", 'Bengali': "আলু" } },
  { name: "Cumin", price: 18, img: "https://images.unsplash.com/photo-1701189975806-97b11541ec82?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", translations: { 'Hindi': "जीरा", 'Bengali': "জিরা" } },
  { name: "Cinnamon", price: 18, img: "https://cdn.britannica.com/80/142080-050-7773CE98/Cinnamon-quills.jpg", translations: { 'Hindi': "दालचीनी", 'Bengali': "দারচিনি" } },
];

export default function Basic({ onAddToCart, currentLanguage, onInitiateBuyNow, searchQuery }) {
  const handleAddToCartClick = (product) => {
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const handleBuyNowClick = (product) => {
    if (onInitiateBuyNow) {
      onInitiateBuyNow(product);
    }
  };

  const getTranslatedName = (item) => {
    return item.translations && item.translations[currentLanguage]
      ? item.translations[currentLanguage]
      : item.name;
  };

  const getTranslatedButtonText = (key) => {
    return translations[currentLanguage]?.[key] || translations['English'][key];
  };

  const filteredSpices = spices.filter(item => {
    const itemName = item.name.toLowerCase();
    const translatedName = getTranslatedName(item).toLowerCase();
    const query = searchQuery.toLowerCase();
    return itemName.includes(query) || translatedName.includes(query);
  });

  return (
    <main className="basic-main">
      <h2 className="basic-heading">
        {getTranslatedButtonText('vendorHeading')}
      </h2>
      <div className="spice-grid">
        {filteredSpices.length === 0 ? (
          <p className="no-products-found-message">
            {getTranslatedButtonText('noProductsFound')}
          </p>
        ) : (
          filteredSpices.map((item, idx) => (
            <div key={idx} className="spice-card">
              <img src={item.img} alt={item.name} className="spice-image" />
              <h3 className="spice-name">{getTranslatedName(item)}</h3>
              <p className="spice-price">₹{item.price.toFixed(2)} 1kg</p>
              <div className="button-group">
                <button className="add-to-cart-btn" onClick={() => handleAddToCartClick(item)}>
                  {getTranslatedButtonText('addToCart')}
                </button>
                <button className="buy-now-btn" onClick={() => handleBuyNowClick(item)}>
                  {getTranslatedButtonText('buyNow')}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}