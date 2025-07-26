import React, { useState } from "react";
import './App.css';
import Navbar from "./Components/Navbar/Navbar";
import Basic from "./Components/Basic/Basic";
import Footer from "./Components/Footer/Footer";
import CartModal from "./Components/CartModal/CartModal";
export default function App() {
  // cartItems will now store an array of product objects
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false); // New state to control cart modal visibility

  // Function to add an item to the cart
  const handleAddToCart = (product) => {
    setCartItems(prevItems => {
      // Check if the item already exists in the cart
      const existingItem = prevItems.find(item => item.name === product.name);
      if (existingItem) {
        // If it exists, increment its quantity
        return prevItems.map(item =>
          item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // If it's a new item, add it with quantity 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Function to remove an item from the cart
  const handleRemoveFromCart = (productName) => {
    setCartItems(prevItems => prevItems.filter(item => item.name !== productName));
  };

  // Function to update item quantity (e.g., from within the cart modal)
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
      {/* Pass cartItems and setIsCartOpen to Navbar */}
      <Navbar
        cartItemCount={cartItems.reduce((total, item) => total + item.quantity, 0)} // Calculate total count for badge
        onCartButtonClick={() => setIsCartOpen(true)} // Pass a function to open the cart
      />
      {/* Pass handleAddToCart to Basic */}
      <Basic onAddToCart={handleAddToCart} />
      <Footer />

      {/* Cart Modal Component */}
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