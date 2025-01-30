import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../pages/CartContext";
import "../styles/pages/payment.css";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail"); 

  const handlePayment = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }


  const userEmail = localStorage.getItem("userEmail"); 

  if (!userEmail) {
    alert("User not logged in. Please log in first.");
    return;
  }

    const orderDetails = {
      userEmail,
      cartItems: cart,
      totalAmount: cart.reduce((total, item) => total + item.price, 0),
      paymentMethod,
      orderDate: new Date().toISOString(),
    };

    try {
      const req = await fetch("http://localhost:5001/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderDetails),
      });

      const data = await req.json();
      if (req.ok) {
        alert("Payment successful using ${paymentMethod}!");
      
        navigate("/orders"); 
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="payment">
      <h2>Complete Your Payment</h2>
      <p>Select a payment method and proceed.</p>

      <div className="options">
        {["Credit/Debit Card", "Google Pay", "PayPal", "UPI"].map((method) => (
          <label key={method}>
            <input
              type="radio"
              name="payment"
              value={method}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            {method}
          </label>
        ))}
      </div>

      <button className="paybutton" onClick={handlePayment}>
        Pay Now
      </button>
    </div>
  );
};

export default PaymentPage;
