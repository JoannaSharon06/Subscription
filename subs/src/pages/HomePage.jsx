import React from 'react';
import { Link } from 'react-router-dom';
import BackgroundImage from '../assets/subs.jpg';
import '../styles/pages/home.css';

const HomePage = () => {
  return (
    <div >
      <img src={BackgroundImage} alt="Background" id="backgroundimage" />

      <div className="content">
        <h1>Welcome to SubsManager</h1>
        <p>Choose your favorite subscription and add it to your cart!</p>

        <Link to="/subscriptions" id="subsbutton">
          Go to Subscription Page
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
