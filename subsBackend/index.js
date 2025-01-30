require("dotenv").config();
const express = require('express');
const path = require('path');
const mdb = require('mongoose');
const dotenv = require('dotenv');
const Signup = require("./models/signupSchema");
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
app.use(cors());
app.use(express.json());

mdb.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB Connection Successful");
  })
  .catch((err) => {
    console.log("MongoDb connection unsuccessful", err);
  });


app.post('/signup', async(req, res) => {
  var { firstname, lastname, username, email, password } = req.body;
  var hashedPassword=await bcrypt.hash(password,15);
  console.log(hashedPassword)
  try {
    console.log("inside try");
    const newCustomer = new Signup({
      firstname: firstname,
      lastname: lastname,
      username: username,
      email: email,
      password: hashedPassword,
    });

    console.log(newCustomer);
    newCustomer.save();
    res.status(201).json({response:"Signup successful",signupStatus:true});
  } catch (err) {
    res.status(400).send("Signup unsuccessful", err);
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Signup.findOne({ email: email });
    if (!user) {
     
      return res.status(404).send({response:"User not found",loginStatus:false});
    }
    const payload={
      email:user.email,
      username:user.username
    }
    const token=jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:"1hr"})

    if (bcrypt.compare(user.password , password)) {
      res.status(200).send({response:"Login successful",loginStatus:true,token:token});
    } else {
      res.status(401).send({response:"Incorrect password",loginStatus:false});
    }
  } catch (err) {
    res.status(500).send("Error during login");
  }
});

const CartItemSchema = new mdb.Schema({
  name: String,
  price: Number,
  quantity: Number,
  userEmail:String,
});
const CartItem = mdb.model("CartItem", CartItemSchema);

app.post("/cart", async (req, res) => {
  try {
    const { name, price, quantity, userEmail } = req.body;

    if (!userEmail) {
      return res.status(400).json({ message: "User email is required." });
    }

    const item = new CartItem({ name, price, quantity, userEmail });
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.get("/cart", async (req, res) => {
  const items = await CartItem.find();
  res.json(items);
});


app.post("/payment", async (req, res) => {
  try {
    const { amount, token } = req.body;
    const charge = await stripe.charges.create({
      amount: amount ,
      currency: "inr",
      source: token.id,
      description: "Subscription Payment",
    });
    res.json(charge);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


const OrderSchema = new mdb.Schema({
  userEmail: String,
  cartItems: Array,
  totalAmount: Number,
  paymentMethod: String,
  orderDate: String,
});

const Order = mdb.model("Order", OrderSchema);

app.post("/orders", async (req, res) => {
  try {
    const { userEmail, cartItems, totalAmount, paymentMethod } = req.body;

    if (!userEmail || !cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Missing email or cart items." });
    }

    const newOrder = new Order({
      userEmail,
      cartItems,
      totalAmount,
      paymentMethod,
      orderDate: new Date().toISOString(),
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully" });
  } catch (err) {
    console.error("Error placing order", err);
    res.status(500).json({ message: "Failed to place order" });
  }
});


app.get("/orders", async (req, res) => {
  try {
    const userEmail = req.query.userEmail;
    console.log(userEmail);
    if (!userEmail) {
      return res.status(400).json({ message: "User email is required." });
    }

    const orders = await Order.find({ userEmail: userEmail }); 

    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this email." });
    }

    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Failed to fetch orders." });
  }
});


app.get("/orders/:email", async (req, res) => {
  try {
    const email = req.params.email.trim(); // Ensure no spaces or line breaks

    if (!email) {
      return res.status(400).json({ message: "User email is required." });
    }

    const orders = await Order.find({ userEmail: email });

    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this email." });
    }

    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Failed to fetch orders." });
  }
});



app.listen(5001, () => {
  console.log("Server connected on port 5001");
});
