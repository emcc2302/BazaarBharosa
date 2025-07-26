import React, { useState } from "react";
import './App.css';
import Navbar from "./Components/Navbar/Navbar";
import Slogan from "./Components/Slogan/Slogan";
import Basic from "./Components/Basic/Basic";
import Footer from "./Components/Footer/Footer";
import CartModal from "./Components/CartModal/CartModal";
import AuthModal from "./Components/AuthModal/AuthModal"; // Ensure AuthModal is imported here

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('English');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleAddToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.name === product.name);
      if (existingItem) {
        return prevItems.map(item =>
          item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (productName) => {
    setCartItems(prevItems => prevItems.filter(item => item.name !== productName));
  };

  const handleUpdateQuantity = (productName, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(productName);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.name === productName ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  return (
    <div className="app">
      <Navbar
        cartItemCount={cartItems.reduce((total, item) => total + item.quantity, 0)}
        onCartButtonClick={() => setIsCartOpen(true)}
        currentLanguage={currentLanguage}
        setCurrentLanguage={setCurrentLanguage}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <Slogan />
      <Basic onAddToCart={handleAddToCart} currentLanguage={currentLanguage} />
      <Footer />

      {isCartOpen && (
        <CartModal
          cartItems={cartItems}
          onClose={() => setIsCartOpen(false)}
          onRemoveItem={handleRemoveFromCart}
          onUpdateQuantity={handleUpdateQuantity}
          currentLanguage={currentLanguage}
        />
      )}
      {/* AuthModal is rendered conditionally within Navbar, so no need to render here directly.
          The previous error might have been caused by an accidental extra brace or token here.
          Ensure it's NOT rendered directly here if Navbar handles its display.
      */}
      {/* If you *did* intend to render AuthModal here, it should look like this:
      {showAuthModal && ( // Assuming showAuthModal state would be here in App.jsx
        <AuthModal
          show={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          userType={authModalUserType}
        />
      )}
      */}
    </div>
  );
}