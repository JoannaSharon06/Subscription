import { Link, useLocation } from "react-router-dom";
import '../styles/pages/nav.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav >
      <div className="logo">🎬 SubsManager</div>
      <ul className="navlinks">
        <li >
          <Link to="/home">Home</Link>
          <Link to="/subscriptions">Subscriptions</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/signup">Signup</Link>
          <Link to="/orders">Orders</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
