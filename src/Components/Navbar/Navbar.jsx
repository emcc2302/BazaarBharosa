import React, { useState, useEffect, useRef } from "react"; // Import useEffect and useRef
import './Navbar.css';
import { FaUser, FaShoppingCart, FaSearch, FaMapMarkerAlt, FaGlobe, FaBars, FaTimes } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import Signin from "../Signin/Signin";
import AuthModal from "../AuthModal/AuthModal";

export default function Navbar({ cartItemCount, onCartButtonClick, currentLanguage, setCurrentLanguage, isMobileMenuOpen, setIsMobileMenuOpen }) {
  const [showSigninDropdown, setShowSigninDropdown] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalUserType, setAuthModalUserType] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  const [showLocationOptions, setShowLocationOptions] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Select Location");
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);

  // Ref for the mobile menu container
  const mobileMenuRef = useRef(null);

  // Effect to handle clicks outside the mobile menu
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

  // NEW EFFECT: Close mobile menu on scroll
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

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setShowLocationOptions(false);
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
    console.log("Selected location:", location);
  };

  const handleLanguageSelect = (langCode) => {
    setCurrentLanguage(langCode); // This is the crucial line that updates the language in App.jsx
    setShowLanguageOptions(false);
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
    console.log("Selected language:", langCode);
  };

  const handleLoginTypeClick = (type) => {
    setAuthModalUserType(type);
    setShowAuthModal(true);
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
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
        <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="desktop-nav-link">My Orders</a>
        <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="desktop-nav-link">Track Shipment</a>
        <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="desktop-nav-link">Help</a>

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
              className="mobile-menu-item" // Add class for styling if needed
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

        {/* Desktop-only elements (Cart, Sign In, Language, Location) */}
        <div className="desktop-only-controls"> {/* New wrapper for desktop-only items */}
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