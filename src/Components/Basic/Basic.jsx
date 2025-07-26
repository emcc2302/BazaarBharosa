import React from "react";
import './Basic.css';

const spices = [
  { name: "Saffron Threads", price: 14, img: "https://images.unsplash.com/photo-1643471672168-f4a4b6cfa440?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Tellicherry Black Peppercorns", price: 14, img: "https://plus.unsplash.com/premium_photo-1726072357017-0af7b90a463d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Turmeric Powder", price: 14, img: "https://images.unsplash.com/photo-1702041295331-840d4d9aa7c9?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Black Sesame", price: 16, img: "https://plus.unsplash.com/premium_photo-1667773301057-65909aa87b95?q=80&w=968&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Pink Pepper", price: 16, img: "https://i0.wp.com/madagascar-market.com/wp-content/uploads/2017/10/36.jpg?fit=680%2C453&ssl=1" },
  { name: "Paprika", price: 18, img: "https://images.unsplash.com/photo-1669863347362-1630fe821708?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Cucumber", price: 18, img: "https://images.unsplash.com/photo-1568584711271-6c929fb49b60?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Chilli", price: 18, img: "https://images.unsplash.com/photo-1546860255-95536c19724e?q=80&w=708&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Coriander", price: 18, img: "https://images.unsplash.com/photo-1535189487909-a262ad10c165?q=80&w=1099&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Ginger", price: 18, img: "https://images.unsplash.com/photo-1603431777782-912e3b76f60d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Garlic", price: 18, img: "https://images.unsplash.com/reserve/E6Ai8EoSQp2unXHEd1GA_GarlicHarvest.jpg?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Onion", price: 18, img: "https://images.unsplash.com/photo-1642582037312-9b9639be89e6?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Potato", price: 18, img: "https://images.unsplash.com/photo-1590165482129-1b8b27698780?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Cumin", price: 18, img: "https://images.unsplash.com/photo-1701189975806-97b11541ec82?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Cinnamon", price: 18, img: "https://cdn.britannica.com/80/142080-050-7773CE98/Cinnamon-quills.jpg" },
];

export default function Basic({ onAddToCart }) {
  const handleAddToCartClick = (product) => {
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const handleBuyNowClick = (product) => {
    // In a real application, this would:
    // 1. Add the item to a temporary cart or directly prepare for checkout.
    // 2. Redirect to a checkout page (e.g., using React Router or window.location).
    console.log("Buying now:", product.name, "for $", product.price.toFixed(2));
    alert(`Proceeding to buy ${product.name} now!`); // Placeholder for demo
    // Example: window.location.href = `/checkout?item=${product.name}&price=${product.price}`;
  };

  return (
    <main className="basic-main">
      <h2 className="basic-heading">Vendor</h2>
      <div className="spice-grid">
        {spices.map((item, idx) => (
          <div key={idx} className="spice-card">
            <img src={item.img} alt={item.name} className="spice-image" />
            <h3 className="spice-name">{item.name}</h3>
            <p className="spice-price">₹{item.price.toFixed(2)}   1kg</p>
            <div className="button-group"> {/* New div to group buttons */}
              <button className="add-to-cart-btn" onClick={() => handleAddToCartClick(item)}>
                Add to Cart
              </button>
              <button className="buy-now-btn" onClick={() => handleBuyNowClick(item)}>
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}