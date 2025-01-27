const { WebSocketServer } = require("ws");
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserSchema = require("./schemas/UserSchema");
const User = require("./models/User");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
const mongoDBUri = process.env.MONGODB_URI;
mongoose
  .connect(mongoDBUri)
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// HTTP Server
const server = app.listen(5000, () => {
  console.log("HTTP Server running on http://localhost:5000");
});

// WebSocket Server
const wss = new WebSocketServer({ server });

let connectedUsers = {};

wss.on("connection", function (ws) {
  let currentUser = null;

  ws.on("message", function (data) {
    const parsedData = JSON.parse(data);
    const { type, message, username } = parsedData;

    if (type === "join") {
      if (!username) {
        ws.send(JSON.stringify({ type: "error", msg: "Username is required" }));
        return;
      }

      if (!connectedUsers[username]) {
        currentUser = username;
        connectedUsers[username] = ws;
        broadcastUserList();
      }
    }

    if (type === "chat") {
      if (currentUser) {
        broadcastMessage({ username: currentUser, message });
      }
    }

    if (type === "leave" && currentUser) {
      delete connectedUsers[currentUser];
      broadcastUserList();
    }
  });

  ws.on("close", function () {
    if (currentUser) {
      delete connectedUsers[currentUser];
      broadcastUserList();
    }
  });

  function broadcastUserList() {
    const users = Object.keys(connectedUsers);
    const userListData = JSON.stringify({ type: "userList", users });
    for (const username in connectedUsers) {
      connectedUsers[username].send(userListData);
    }
  }

  function broadcastMessage({ username, message }) {
    const chatMessageData = JSON.stringify({
      type: "message",
      username,
      message,
    });
    for (const username in connectedUsers) {
      if (username !== currentUser) {
        connectedUsers[username].send(chatMessageData);
      }
    }
  }
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

    const newUser = new UserSchema({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
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
    const findBy = username ? { username } : email ? { email } : null;

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
      username: user.username,
    });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ADD BOOK
app.post("/my-books/add", async (req, res) => {
  const { username, book } = req.body;

  try {
    if (!username || !book) {
      return res.status(400).json({ message: "Username and book are required" });
    }

    const user = await UserSchema.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const alreadyAdded = user.myBooks.some((b) => b.id === book.id);
    if (alreadyAdded) {
      return res.status(400).json({ message: "Book already added" });
    }

    user.myBooks.push(book);
    await user.save();
    res.status(200).json({ message: "Book added to collection", myBooks: user.myBooks });
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

// REMOVE BOOK
app.post("/my-books/remove", async (req, res) => {
  const { username, bookId } = req.body;

  try {
    const user = await UserSchema.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.myBooks = user.myBooks.filter((b) => b.id !== bookId);
    await user.save();
    res.status(200).json({ message: "Book removed from collection", myBooks: user.myBooks });
  } catch (error) {
    res.status(500).json({ message: "Error removing book", error });
  }
});

// FETCH BOOKS
app.get("/my-books", async (req, res) => {
  const { username } = req.query;

  try {
    const user = await UserSchema.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.myBooks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching collection", error });
  }
});

// SET FAVORITE BOOK
app.post("/my-books/favorite", async (req, res) => {
  const { username, bookId } = req.body;

  try {
    const user = await UserSchema.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const book = user.myBooks.find((b) => b.id === bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    book.favorite = true;
    await user.save();
    res.status(200).json({ message: "Book marked as favorite", myBooks: user.myBooks });
  } catch (error) {
    res.status(500).json({ message: "Error setting favorite", error });
  }
});

// SET READ BOOK
app.post("/my-books/read", async (req, res) => {
  const { username, bookId } = req.body;

  try {
    const user = await UserSchema.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const book = user.myBooks.find((b) => b.id === bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    book.read = true;
    await user.save();
    res.status(200).json({ message: "Book marked as read", myBooks: user.myBooks });
  } catch (error) {
    res.status(500).json({ message: "Error setting read status", error });
  }
});

// FRONTEND FILES
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});
