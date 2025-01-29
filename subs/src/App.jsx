import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SubscriptionPage from "./pages/Subscription";
import ViewCart from "./pages/ViewCart";
import { CartProvider } from "./pages/CartContext";
import Navbar from "./pages/Navbar";
import Home from "./pages/HomePage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import PaymentPage from "./pages/Payment";
import Orders from "./pages/Orders";

const App = () => {
  
  return (
    <CartProvider>
      <Router>
        <Navbar/>
        <Routes>
         
          <Route path="/" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/subscriptions" element={<SubscriptionPage />} />
          <Route path="/cart" element={<ViewCart />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
