// src/Components/Navbar/Navbar.jsx
import React, { useState } from "react";
import './Navbar.css';
import { FaUser, FaShoppingCart, FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import Signin from "../Signin/Signin"; // Import the Signin dropdown component
import AuthModal from "../AuthModal/AuthModal"; // Import the new AuthModal component

export default function Navbar({ cartItemCount, onCartButtonClick }) {
  const [showSigninDropdown, setShowSigninDropdown] = useState(false); // Controls Signin dropdown visibility
  const [showAuthModal, setShowAuthModal] = useState(false); // Controls AuthModal visibility
  const [authModalUserType, setAuthModalUserType] = useState(''); // Stores 'vendor' or 'supplier'

  const [searchQuery, setSearchQuery] = useState('');
  const [showLocationOptions, setShowLocationOptions] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Select Location");

  const locations = [
    "New Delhi",
    "Mumbai",
    "Bengaluru",
    "Chennai",
    "Kolkata",
    "Hyderabad",
    "Patna",
    "Ranchi",
    "Murshidabad",
    "Malda",
    "Pune"
  ];

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setShowLocationOptions(false);
    console.log("Selected location:", location);
  };

  const handleLoginTypeClick = (type) => {
    setAuthModalUserType(type); // Set the user type for the modal
    setShowAuthModal(true); // Open the AuthModal
  };

  return (
    <header className="navbar">
      <h1 className="navbar-logo">BazaarBharosa</h1> 

      <nav className="nav-links">
        <a href="#">Home</a>
        <a href="#">Browse Spices</a>
        <a href="#">My Orders</a>
        <a href="#">Track Shipment</a>
        <a href="#">Help</a>
      </nav>

      <div className="navbar-right-section">
        {/* Location Selector */}
        <div className="location-selector">
          <button
            className="location-button"
            onClick={() => setShowLocationOptions(!showLocationOptions)}
          >
            <FaMapMarkerAlt />
            <span>{selectedLocation}</span>
            <IoMdArrowDropdown />
          </button>
          {showLocationOptions && (
            <div className="location-dropdown">
              {locations.map((location, index) => (
                <button
                  key={index}
                  className="dropdown-item"
                  onClick={() => handleLocationSelect(location)}
                >
                  {location}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
          <button className="search-button" onClick={handleSearch}>
            <FaSearch />
          </button>
        </div>

        {/* Cart Button */}
        <button className="cart-button" onClick={onCartButtonClick}>
          <FaShoppingCart />
          {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
        </button>

        {/* Sign In Dropdown Component */}
        <Signin
          show={showSigninDropdown}
          setShow={setShowSigninDropdown}
          onLoginClick={handleLoginTypeClick} // Pass the handler to Signin
        />
      </div>

      {/* Render AuthModal when showAuthModal is true */}
      {showAuthModal && (
        <AuthModal
          show={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          userType={authModalUserType}
        />
      )}
    </header>
  );
}