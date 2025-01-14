import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

import "../assets/style.css";

import welcomeImage from "../assets/welcome-image.png";

const Home = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const onButtonClick = async () => {
    setEmailError("");
    setPasswordError("");

    if ("" === email) {
      setEmailError("Please enter your email.");
      return;
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Please enter a valid email");
      return;
    }

    if ("" === password) {
      setPasswordError("Please enter a password");
      return;
    }

    // Send to nodejs server to check the db for account
    try {
      // Send POST request with email and password in the body
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      if (response.status === 200) {
        alert("Login successful!");
        navigate("/home"); // Redirect on successful login
      } else {
        navigate("/register");
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.msg || "An error occurred during login.");
      } else {
        alert("No response from the server.");
      }
    }
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="mainContainer">
      <div className="contentContainer">
        <div className="rightContainer">
          <div className="titleContainer">
            <div>
              Hello, <br /> welcome to ShelfTalk!
            </div>
          </div>
          <div className="formContainer">
            <div className={"inputContainer"}>
              <input
                value={email}
                placeholder="example@email.com"
                onChange={(ev) => setEmail(ev.target.value)}
                className={"inputBox"}
              />
              <label className="errorLabel">{emailError}</label>
            </div>
            <div className={"inputContainer"}>
              <input
                type="password"
                value={password}
                placeholder="examplepassword123"
                onChange={(ev) => setPassword(ev.target.value)}
                className={"inputBox"}
              />
              <label className="errorLabel">{passwordError}</label>
            </div>
          </div>
          <div className="buttonContainer">
            <input
              className="inputButton"
              type="button"
              onClick={onButtonClick}
              value="Log in"
            />
            <Link to="/register" className="linkButton">
              Sign up
            </Link>
          </div>
        </div>
        <div className="imageContainer">
          <img src={welcomeImage} alt="Welcome" className="welcomeImage" />
        </div>
      </div>
    </div>
  );
};

export default Home;
