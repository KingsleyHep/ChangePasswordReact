import React, { useState } from "react";
import "../styles.css";
//import here

export default function Login({ onAuthentication, userName, password }) {
  //declare functions here
  function handleLogin() {
    if (userNameState === userName && passwordState === password) {
      onAuthentication();
    } else {
      window.alert("Please enter the correct details");
    }
  }

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  //declare variables here
  const [userNameState, setUserName] = useState("");
  const [passwordState, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  console.log("passwordState in Login component is: " + passwordState);
  //return DOM elements here
  return (
    <div className="login form">
      <nav>
        <h1>Login Page</h1>
      </nav>
      <div className="display">
        <text>User Name:</text>
        <br></br>
        <input
          type="userName"
          placeholder="User Name"
          onChange={(eventHappens) => {
            setUserName(eventHappens.target.value);
          }}
        />

        <br></br>
        <text>Current Password:</text>
        <br></br>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Current Password"
          onChange={(eventHappens) => {
            setPassword(eventHappens.target.value);
          }}
        />
        <br></br>
        <button onClick={handlePasswordVisibility}>
          {showPassword ? "Hide Password" : "Show Password"}
        </button>
        <button onClick={handleLogin}>Submit</button>
        <br></br>
      </div>
    </div>
  );
}
