import React from "react";
import './Footer.css'; // Keep this import

export default function Footer() {
  return (
    <footer className="footer-container"> {/* Replaced all Tailwind classes with 'footer-container' */}
      &copy; {new Date().getFullYear()} BazaarBharosa. All rights reserved.
    </footer>
  );
}