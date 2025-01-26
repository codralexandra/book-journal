import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../../assets/style.css";
import "./register.css";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const navigate = useNavigate();

  const onButtonClick = async () => {
    setEmailError("");
    setPasswordError("");
    setUsernameError("");
  
    if ("" === email || "" === username) {
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
  
    if (password.length < 7) {
      setPasswordError("The password must be 8 characters or longer");
      return;
    }
  
    const newUser = {
      username,
      email,
      password,
    };
  
    try {
      const response = await axios.post("http://localhost:5000/register",
        newUser);
      
      if (response.status === 201) {
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        alert(
          error.response.data.message ||
            "An error occurred during registration."
        );
      } else {
        alert("No response from the server.");
      }
    }
  };
  

  return (
    <div className={"mainContainer"}>
      <div className="registerPage">
        <div className="contentContainer">
          <div className={"titleContainer"}>
            <div>Sign up</div>
          </div>
          <br />
          <div className={"inputContainer"}>
            <input
              value={username}
              placeholder="username"
              onChange={(ev) => setUsername(ev.target.value)}
              className={"inputBox"}
            />
            <label className="errorLabel">{usernameError}</label>
          </div>
          <br />
          <div className={"inputContainer"}>
            <input
              value={email}
              placeholder="mail"
              onChange={(ev) => setEmail(ev.target.value)}
              className={"inputBox"}
            />
            <label className="errorLabel">{emailError}</label>
          </div>
          <br />
          <div className={"inputContainer"}>
            <input
              value={password}
              placeholder="password"
              onChange={(ev) => setPassword(ev.target.value)}
              className={"inputBox"}
            />
            <label className="errorLabel">{passwordError}</label>
          </div>
          <br />
          <div className={"inputContainer"}>
            <input
              className={"inputButton"}
              type="button"
              onClick={onButtonClick}
              value={"Register"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
