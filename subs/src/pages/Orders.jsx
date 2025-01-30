import React, { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    if (userEmail) {
      fetch("https://subscription-2.onrender.com/orders/{userEmail}")
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched Orders:", data); 
          setOrders(data);
        })
        .catch((error) => console.error("Error fetching orders:", error));
    }
  }, [userEmail]);

  return (
    <div className="orders">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order, index) => (
            <li key={index}>
              {order.cartItems.map((item) => (
                <div key={item.name}>
                  {item.name} - ₹{item.price} ({order.paymentMethod})
                </div>
              ))}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;
