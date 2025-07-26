// src/Components/AuthModal/AuthModal.jsx
import React, { useState } from "react";
import './AuthModal.css'; // Create this CSS file next
import { FaTimes } from "react-icons/fa";

export default function AuthModal({ show, onClose, userType }) {
  const [isLoginMode, setIsLoginMode] = useState(true); // true for login, false for signup
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const modalTitle = isLoginMode
    ? `${userType.charAt(0).toUpperCase() + userType.slice(1)} Login`
    : `${userType.charAt(0).toUpperCase() + userType.slice(1)} Sign Up`;

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    console.log(`Logging in as ${userType} with:`, { email, password });
    // --- INTEGRATE FIREBASE AUTH HERE FOR LOGIN ---
    // Example: signInWithEmailAndPassword(auth, email, password)
    // .then((userCredential) => {
    //   console.log("Logged in:", userCredential.user);
    //   onClose(); // Close modal on success
    // })
    // .catch((error) => {
    //   setError(error.message);
    // });
    alert(`Login attempt for ${userType}: ${email}`); // Placeholder
    onClose(); // Close modal for demo purposes
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    console.log(`Signing up as ${userType} with:`, { email, password });
    // --- INTEGRATE FIREBASE AUTH HERE FOR SIGNUP ---
    // Example: createUserWithEmailAndPassword(auth, email, password)
    // .then((userCredential) => {
    //   console.log("Signed up:", userCredential.user);
    //   onClose(); // Close modal on success
    // })
    // .catch((error) => {
    //   setError(error.message);
    // });
    alert(`Signup attempt for ${userType}: ${email}`); // Placeholder
    onClose(); // Close modal for demo purposes
  };

  const handleForgetPassword = () => {
    console.log("Forgot Password clicked");
    alert("Forgot Password functionality would go here."); // Placeholder
    // In a real app, this would trigger a password reset email or open another modal
  };

  if (!show) return null; // Don't render if 'show' is false

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="auth-modal-header">
          <h2>{modalTitle}</h2>
          <button className="auth-modal-close-button" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="auth-modal-body">
          {error && <p className="auth-error-message">{error}</p>}

          <form onSubmit={isLoginMode ? handleLogin : handleSignup}>
            <div className="form-group">
              <label htmlFor="auth-email">Email:</label>
              <input
                type="email"
                id="auth-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="auth-password">Password:</label>
              <input
                type="password"
                id="auth-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {!isLoginMode && (
              <div className="form-group">
                <label htmlFor="auth-confirm-password">Confirm Password:</label>
                <input
                  type="password"
                  id="auth-confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            )}

            <button type="submit" className="auth-submit-button">
              {isLoginMode ? "Login" : "Sign Up"}
            </button>
          </form>

          <div className="auth-footer-links">
            {isLoginMode ? (
              <>
                <button className="link-button" onClick={handleForgetPassword}>
                  Forgot Password?
                </button>
                <span> | </span>
                <button className="link-button" onClick={() => { setIsLoginMode(false); setError(''); }}>
                  New User? Sign Up
                </button>
              </>
            ) : (
              <button className="link-button" onClick={() => { setIsLoginMode(true); setError(''); }}>
                Already have an account? Login
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}