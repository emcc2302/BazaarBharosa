import React, { useState } from "react";
import './App.css';
import Navbar from "./Components/Navbar/Navbar";
import Slogan from "./Components/Slogan/Slogan"; // Import the new Slogan component
import Basic from "./Components/Basic/Basic";
import Footer from "./Components/Footer/Footer";
import CartModal from "./Components/CartModal/CartModal";

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

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
      />
      <Slogan /> {/* Add the Slogan component here, right after Navbar */}
      <Basic onAddToCart={handleAddToCart} />
      <Footer />

      {isCartOpen && (
        <CartModal
          cartItems={cartItems}
          onClose={() => setIsCartOpen(false)}
          onRemoveItem={handleRemoveFromCart}
          onUpdateQuantity={handleUpdateQuantity}
        />
      )}
    </div>
  );
}