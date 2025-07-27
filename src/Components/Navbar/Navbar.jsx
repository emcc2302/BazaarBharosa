import React, { useState, useEffect, useRef } from "react";
import './Navbar.css';
import { FaUser, FaShoppingCart, FaSearch, FaMapMarkerAlt, FaGlobe, FaBars, FaTimes } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import Signin from "../Signin/Signin";
import AuthModal from "../AuthModal/AuthModal";

// Added searchQuery and setSearchQuery to Navbar props
export default function Navbar({ cartItemCount, onCartButtonClick, currentLanguage, setCurrentLanguage, isMobileMenuOpen, setIsMobileMenuOpen, onTrackShipmentClick, onMyOrdersClick, onHelpClick, searchQuery, setSearchQuery }) {
  const [showSigninDropdown, setShowSigninDropdown] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalUserType, setAuthModalUserType] = useState('');

  // const [searchQuery, setSearchQuery] = useState(''); // Removed, as it's now passed from App.jsx
  const [showLocationOptions, setShowLocationOptions] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Select Location");
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);

  const mobileMenuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (isMobileMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && !event.target.closest('.hamburger-icon')) {
        setIsMobileMenuOpen(false);
      }
    }
    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen, setIsMobileMenuOpen]);

  useEffect(() => {
    function handleScroll() {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobileMenuOpen, setIsMobileMenuOpen]);

  const locations = [
    "New Delhi", "Mumbai", "Bengaluru", "Chennai", "Kolkata", "Hyderabad",
    "Patna", "Ranchi", "Murshidabad", "Malda", "Pune"
  ];

  const languages = [
    { code: 'English', name: 'English' },
    { code: 'Hindi', name: 'हिंदी' },
    { code: 'Bengali', name: 'বাংলা' },
  ];

  // handleSearch now just updates the searchQuery state passed from App.jsx
  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
    // The actual filtering logic will be in Basic.jsx
    // Close mobile menu if open after initiating search
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setShowLocationOptions(false);
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
    console.log("Selected location:", location);
    // No alert here
  };

  const handleLanguageSelect = (langCode) => {
    setCurrentLanguage(langCode);
    setShowLanguageOptions(false);
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
    console.log("Selected language:", langCode);
    // REMOVED ALERT FROM HERE
  };

  const handleLoginTypeClick = (type) => {
    setAuthModalUserType(type);
    setShowAuthModal(true);
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  const handleMyOrdersClick = () => {
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    console.log("My Orders clicked");
    onMyOrdersClick(); // Call the prop function to open the modal
  };

  const handleTrackShipmentClick = () => {
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    console.log("Track Shipment clicked");
    onTrackShipmentClick(); // Call the prop function to open the modal
  };

  const handleHelpClick = () => {
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    console.log("Help clicked");
    onHelpClick(); // NEW: Call the prop function to open the Help modal
  };

  return (
    <header className="navbar">
      <h1 className="navbar-logo">BazaarBharosa</h1>

      {/* Hamburger Menu Icon for Mobile (always visible on mobile) */}
      <button className="hamburger-icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Main Navigation Links (Desktop & Mobile Menu) */}
      <nav ref={mobileMenuRef} className={`nav-links ${isMobileMenuOpen ? 'nav-links-mobile-open' : ''}`}>
        {/* Desktop nav links */}
        <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="desktop-nav-link">Home</a>
        <a href="#" onClick={handleMyOrdersClick} className="desktop-nav-link">My Orders</a>
        <a href="#" onClick={handleTrackShipmentClick} className="desktop-nav-link">Track Shipment</a>
        <a href="#" onClick={handleHelpClick} className="desktop-nav-link">Help</a> {/* Added onClick */}

        {/* These elements are ONLY for the mobile menu when it's open */}
        {isMobileMenuOpen && (
          <>
            {/* Cart Button in Mobile Menu */}
            <button className="cart-button mobile-menu-item" onClick={onCartButtonClick}>
              <FaShoppingCart />
              {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
            </button>

            {/* Sign In Dropdown Component in Mobile Menu */}
            <Signin
              show={showSigninDropdown}
              setShow={setShowSigninDropdown}
              onLoginClick={handleLoginTypeClick}
              className="mobile-menu-item"
            />

            {/* Language Selector in Mobile Menu */}
            <div className="language-selector mobile-menu-item">
              <button
                className="language-button"
                onClick={() => setShowLanguageOptions(!showLanguageOptions)}
              >
                <FaGlobe />
                <span>{currentLanguage}</span>
                <IoMdArrowDropdown />
              </button>
              {showLanguageOptions && (
                <div className="language-dropdown">
                  {languages.map((lang, index) => (
                    <button
                      key={index}
                      className="dropdown-item"
                      onClick={() => handleLanguageSelect(lang.code)}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Location Selector in Mobile Menu */}
            <div className="location-selector mobile-menu-item">
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
          </>
        )}
      </nav>

      {/* Right Section - Contains Search (always visible) and Desktop-only elements */}
      <div className="navbar-right-section">
        {/* Search Bar (Always visible) */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products..."
            className="search-input"
            value={searchQuery} // Pass searchQuery
            onChange={(e) => setSearchQuery(e.target.value)} // Pass setSearchQuery
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

        {/* Desktop-only elements (Cart, Sign In, Language, Location) */}
        <div className="desktop-only-controls">
          {/* Language Selector (Desktop Only) */}
          <div className="language-selector">
            <button
              className="language-button"
              onClick={() => setShowLanguageOptions(!showLanguageOptions)}
            >
              <FaGlobe />
              <span>{currentLanguage}</span>
              <IoMdArrowDropdown />
            </button>
            {showLanguageOptions && (
              <div className="language-dropdown">
                {languages.map((lang, index) => (
                  <button
                    key={index}
                    className="dropdown-item"
                    onClick={() => handleLanguageSelect(lang.code)}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Location Selector (Desktop Only) */}
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

          {/* Cart Button (Desktop Only) */}
          <button className="cart-button" onClick={onCartButtonClick}>
            <FaShoppingCart />
            {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
          </button>

          {/* Sign In Dropdown Component (Desktop Only) */}
          <Signin
            show={showSigninDropdown}
            setShow={setShowSigninDropdown}
            onLoginClick={handleLoginTypeClick}
          />
        </div>
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