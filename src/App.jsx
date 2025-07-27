import React, { useState } from "react";
import './App.css';
import Navbar from "./Components/Navbar/Navbar";
import Slogan from "./Components/Slogan/Slogan";
import Basic from "./Components/Basic/Basic";
import Footer from "./Components/Footer/Footer";
import CartModal from "./Components/CartModal/CartModal";
import AuthModal from "./Components/AuthModal/AuthModal";
import TrackShipmentModal from "./Components/TrackShipmentModal/TrackShipmentModal";
import MyOrdersModal from "./Components/MyOrdersModal/MyOrdersModal";
import HelpModal from "./Components/HelpModal/HelpModal";
import OrderConfirmationToast from "./Components/OrderConfirmationToast/OrderConfirmationToast";
import BuyNowAddressModal from "./Components/BuyNowAddressModal/BuyNowAddressModal";

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('English');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTrackShipmentModalOpen, setIsTrackShipmentModalOpen] = useState(false); // State for Track Shipment modal
  const [isMyOrdersModalOpen, setIsMyOrdersModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  const [isBuyNowAddressModalOpen, setIsBuyNowAddressModalOpen] = useState(false);
  const [productForBuyNowAddress, setProductForBuyNowAddress] = useState(null);

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

  const placeOrder = (itemsToOrder, source, address = null) => {
    if (itemsToOrder.length === 0) {
      alert("No items to place an order for!");
      return;
    }

    const newOrder = {
      orderId: `ORD-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      date: new Date().toLocaleString(),
      items: itemsToOrder.map(item => ({
        name: item.name,
        translatedName: item.translations?.[currentLanguage] || item.name,
        price: item.price,
        quantity: item.quantity || 1,
        img: item.img
      })),
      totalAmount: itemsToOrder.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0),
      status: "Processing",
      source: source,
      address: address
    };

    setOrders(prevOrders => [newOrder, ...prevOrders]);

    setShowOrderConfirmation(true);
    setTimeout(() => {
      setShowOrderConfirmation(false);
    }, 3000);

    if (source === "Cart Checkout") {
      setCartItems([]);
      setIsCartOpen(false);
    }
  };

  const initiateBuyNow = (product) => {
    setProductForBuyNowAddress(product);
    setIsBuyNowAddressModalOpen(true);
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
        onTrackShipmentClick={() => setIsTrackShipmentModalOpen(true)} // This line opens the modal
        onMyOrdersClick={() => setIsMyOrdersModalOpen(true)}
        onHelpClick={() => setIsHelpModalOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Slogan />
      <Basic onAddToCart={handleAddToCart} currentLanguage={currentLanguage} onInitiateBuyNow={initiateBuyNow} searchQuery={searchQuery} />
      <Footer />

      {isCartOpen && (
        <CartModal
          cartItems={cartItems}
          onClose={() => setIsCartOpen(false)}
          onRemoveItem={handleRemoveFromCart}
          onUpdateQuantity={handleUpdateQuantity}
          currentLanguage={currentLanguage}
          onPlaceOrder={placeOrder}
        />
      )}

      {/* Track Shipment Modal */}
      {isTrackShipmentModalOpen && (
        <TrackShipmentModal
          show={isTrackShipmentModalOpen}
          onClose={() => setIsTrackShipmentModalOpen(false)} // This line closes the modal
          orders={orders}
          currentLanguage={currentLanguage}
        />
      )}

      {isMyOrdersModalOpen && (
        <MyOrdersModal
          show={isMyOrdersModalOpen}
          onClose={() => setIsMyOrdersModalOpen(false)}
          orders={orders}
          currentLanguage={currentLanguage}
        />
      )}

      {isHelpModalOpen && (
        <HelpModal
          show={isHelpModalOpen}
          onClose={() => setIsHelpModalOpen(false)}
          currentLanguage={currentLanguage}
        />
      )}

      {showOrderConfirmation && (
        <OrderConfirmationToast currentLanguage={currentLanguage} />
      )}

      {isBuyNowAddressModalOpen && (
        <BuyNowAddressModal
          show={isBuyNowAddressModalOpen}
          onClose={() => setIsBuyNowAddressModalOpen(false)}
          product={productForBuyNowAddress}
          onPlaceOrder={placeOrder}
          currentLanguage={currentLanguage}
        />
      )}
    </div>
  );
}