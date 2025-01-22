const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserSchema = require("./schemas/UserSchema");
const path = require("path");
const cors = require("cors");

const User = require("./models/User");

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

// REGISTER ROUTE
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let existingUser = await UserSchema.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ msg: "Username already exists!" });
    }

    existingUser = await UserSchema.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already registered!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserSchema = new UserSchema({
      username,
      email,
      password: hashedPassword,
    });

    await newUserSchema.save();
    res.status(201).json({ msg: "User created successfully!" });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// LOGIN ROUTE
app.post("/login", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const findBy = username
      ? { username }
      : email
      ? { email }
      : null;

    if (!findBy) {
      return res.status(400).json({ msg: "Username or email is required!" });
    }

    const user = await UserSchema.findOne(findBy);
    if (!user) {
      return res.status(400).json({ msg: "User does not exist!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid email or password!" });
    }

    res.status(200).json({ 
      msg: "User logged in successfully!",
      user: { username: user.username, email: user.email },
    });

    console.log(`User ${username || email} logged in!`);
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

const Port = 5000;
app.listen(Port, () => {
  console.log("Server is running on port: http://localhost:5000");
});
