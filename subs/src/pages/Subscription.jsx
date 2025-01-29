import { useCart } from "../pages/CartContext";
import { useNavigate } from "react-router-dom";
import '../styles/pages/subs.css'
const subscriptions = [
  {
    id: 1,
    name: "Netflix",
    icon: "📺",
    plans: [
      {id: "netflix-mobile", name: "Mobile", price: 99},
      { id: "netflix-basic", name: "Basic", price: 199 },
      { id: "netflix-standard", name: "Standard", price: 499 },
      { id: "netflix-premium", name: "Premium", price: 649 },
    ],
  },
  {
    id: 2,
    name: "Spotify",
    icon: "🎵",
    plans: [
      { id: "spotify-individual", name: "Individual", price: 119 },
      { id: "spotify-duo", name: "Duo", price: 149 },
      { id: "spotify-family", name: "Student", price: 179 },
      { id: "spotify-student", name: "Family", price: 59 },
    ],
  },
  {
    id: 3,
    name: "YouTube",
    icon: "▶️",
    plans: [
      { id: "youtube-individual", name: "Individual", price: 149 },
      { id: "youtube-family", name: "Family", price:299 },
    ],
  },
  {
    id: 4,
    name: "Apple Music",
    icon: "▶️",
    plans: [
      { id: "music-individual", name: "Individual", price: 119 },
      { id: "music-family", name: "Family", price:179 },
    ],
  },
  {
    id: 5,
    name: "Disney+Hotstar",
    icon: "▶️",
    plans: [
      { id: "hotstar-monthly", name: "Monthly", price: 299 },
      { id: "hotstar-yearly", name: "Yearly", price:899 },
    ],
  },
  {
    id: 6,
    name: "Amazon Prime",
    icon: "▶️",
    plans: [
      { id: "amazon-monthly", name: "Monthly", price: 299 },
      { id: "amazon-quarterly", name: "Quarterly", price: 599 },
      { id: "amazon-yearly", name: "Yearly", price:1499 },
    ],
  },
  {
    id: 7,
    name: "Sun NXT",
    icon: "▶️",
    plans: [
      { id: "sun-monthly", name: "Monthly", price: 40 },
      { id: "sun-yearly", name: "Yearly", price:480 },
    ],
  },
];

const SubscriptionPage = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="subscription">
      <h1>Choose Your Subscription</h1>
      <div className="list">
        {subscriptions.map((sub) => (
          <div key={sub.id} className="item">
            <span className="icon">{sub.icon}</span>
            <h3>{sub.name}</h3>
            {sub.plans.map((plan) => (
              <div key={plan.id} className="plan">
                <span>{plan.name} - ₹{plan.price}</span>
                <button onClick={() => addToCart({ ...plan, service: sub.name })}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
      <button className="viewbutton" onClick={() => navigate("/cart")}>
        View Cart
      </button>
    </div>
  );
};

export default SubscriptionPage;
