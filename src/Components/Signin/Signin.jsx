// src/Components/Signin/Signin.jsx
import React from "react"; // Removed useState as it's just a trigger now
import './Signin.css'; // Keep this CSS for dropdown styles
import { FaUser } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";

// Signin now receives props to handle modal display
export default function Signin({ show, setShow, onLoginClick }) {
  // show and setShow now control the visibility of this dropdown itself
  // onLoginClick is a new prop that will be called with 'vendor' or 'supplier'

  return (
    <div className="signin-container"> {/* This is the main container for the dropdown */}
      <button
        className="signin-button" // This button toggles the dropdown
        onClick={() => setShow(!show)}
      >
        <FaUser /> Sign In <IoMdArrowDropdown />
      </button>
      {show && (
        <div className="dropdown-menu"> {/* This is the dropdown content */}
          <button
            className="dropdown-button"
            onClick={() => {
              onLoginClick('vendor'); // Call the passed function with 'vendor'
              setShow(false); // Close the dropdown
            }}
          >
            Vendor Login
          </button>
          <button
            className="dropdown-button"
            onClick={() => {
              onLoginClick('supplier'); // Call the passed function with 'supplier'
              setShow(false); // Close the dropdown
            }}
          >
            Supplier Login
          </button>
        </div>
      )}
    </div>
  );
}