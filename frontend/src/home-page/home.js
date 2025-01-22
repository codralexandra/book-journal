import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

import "../assets/style.css";

import welcomeImage from "../assets/welcome-image.png";

const Home = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const onButtonClick = async () => {
    console.log("Login button clicked");
    console.log("Username: ", username);
    console.log("Email: ", email);
    console.log("Password: ", password);

    setEmailError("");
    setPasswordError("");

    if ("" === email && "" === username) {
      setEmailError("Please enter your email/ username.");
      return;
    }

    if (email && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Please enter a valid email");
      return;
    }

    if ("" === password) {
      setPasswordError("Please enter a password");
      return;
    }

    try {
      const loginUser = {
        username: username || null, 
        email: email || null,
        password,
      };

      const response = await axios.post(
        "http://localhost:5000/login",
        loginUser
      );

      if (response.status === 200) {
        navigate("/home");
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
            <div className="formRow">
              <p>Email or Username:</p>
              <div className={"inputContainer"}>
                <input
                  value={username || email}
                  placeholder="example_username / example@mail.com"
                  onChange={(ev) => {
                    const value = ev.target.value;
                    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
                      setEmail(value);
                      setUsername("");
                    } else {
                      setUsername(value);
                      setEmail("");
                    }
                  }}
                  className={"inputBox"}
                />
                <label className="errorLabel">{emailError}</label>
              </div>
            </div>
            <div className="formRow">
              <p>Password:</p>
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
          </div>
          <div className="buttonContainer">
            <input
              className="loginButton inputButton"
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
