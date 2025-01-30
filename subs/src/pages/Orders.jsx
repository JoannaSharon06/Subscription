import { useEffect, useState } from "react";
import axios from "axios";


const Orders = () => {
  const [orders, setOrders] = useState([]);
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    if (userEmail) {
      const fetchOrders = async () => {
        try {
          console.log("Fetching orders for:", userEmail);
          const response = await axios.get(`http://localhost:5001/orders?userEmail=${userEmail}`);
          console.log("Fetched Orders:", response.data);
          setOrders(response.data);
        } catch (error) {
          console.error("Error fetching orders:", error.response?.status, error.response?.data || error.message);
          setError("Failed to fetch orders. Please try again later.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchOrders();
    }
  }, [userEmail]);

  return (
    <div className="container">
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