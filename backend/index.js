const { WebSocketServer } = require("ws");
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserSchema = require("./schemas/UserSchema");
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

  // When a message is received
  ws.on("message", function (data) {
    const parsedData = JSON.parse(data);
    const { type, message, username } = parsedData;

    // User joining the WebSocket connection
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

    // Chat message handling
    if (type === "chat") {
      if (currentUser) {
        broadcastMessage({ username: currentUser, message });
      }
    }

    // User leaving
    if (type === "leave" && currentUser) {
      delete connectedUsers[currentUser];
      broadcastUserList();
    }
  });

  // Connection close handler
  ws.on("close", function () {
    if (currentUser) {
      delete connectedUsers[currentUser];
      broadcastUserList();
    }
  });

  // Broadcast the list of connected users to all
  function broadcastUserList() {
    const users = Object.keys(connectedUsers);
    const userListData = JSON.stringify({ type: "userList", users });
    for (const username in connectedUsers) {
      connectedUsers[username].send(userListData);
    }
  }

  // Broadcast a chat message to all connected users
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

// BOOK SEARCH 


// FRONTEND FILES
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});
