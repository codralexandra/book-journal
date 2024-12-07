const express = require("express");
const mongoose = require("mongoose");
const bycrpt = require("bcryptjs");
const User = require("./models/User");
const path = require("path");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const mongoDBUri = process.env.MONGODB_URI;
mongoose
  .connect(mongoDBUri)
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error: ", err);
  });

//REGISTER ROUTE
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Email and password are required!" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already exists!" });
    }

    const hashedPassword = await bycrpt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ msg: "User created!" });
  } catch (err) {
    console.error("Erorr registering user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//LOGIN ROUTE

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

const Port = 5000;
app.listen(Port, () => {
  console.log("Server is running on port: http://localhost:5000");
});
