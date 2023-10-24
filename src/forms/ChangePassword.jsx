import "../styles.css";
import React, { useState } from "react";
//import here
//receives properties here

//console log password changes
export default function ChangePassword({ setNewPassword }) {
  //create functions here

  //declare variables here
  const [newPasswordState, setNewPasswordState] = useState("");
  const [confirmPasswordState, setConfirmPasswordState] = useState("");
  const [isPasswordValid, setPasswordValidity] = useState(false);
  const [containsUpperCase, setContainsUpperCase] = useState(false);
  const [containsLowerCase, setContainsLowerCase] = useState(false);
  const [containsSpecialChar, setContainsSpecialChar] = useState(false);
  const [containsNum, setContainsNum] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isValidLength, setIsValidLength] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  //password validation logic called before handlePasswordChange
  function checkPasswordIsValid() {
    const upperCase = /[A-Z]/;
    const lowerCase = /[a-z]/;
    const specialChar = /[!@#$%^&*()_\-+=<>?]/;
    const num = /\d/;

    if (
      upperCase.test(newPasswordState) &&
      upperCase.test(confirmPasswordState)
    ) {
      setContainsUpperCase(true);
    } else {
      setContainsUpperCase(false);
    }
    if (
      lowerCase.test(newPasswordState) &&
      lowerCase.test(confirmPasswordState)
    ) {
      setContainsLowerCase(true);
    } else {
      setContainsLowerCase(false);
    }
    if (
      specialChar.test(newPasswordState) &&
      specialChar.test(confirmPasswordState)
    ) {
      setContainsSpecialChar(true);
    } else {
      setContainsSpecialChar(false);
    }
    if (num.test(newPasswordState) && num.test(confirmPasswordState)) {
      setContainsNum(true);
    } else {
      setContainsNum(false);
    }
    if (newPasswordState.length > 8 && newPasswordState.length < 16) {
      setIsValidLength(true);
    } else {
      setIsValidLength(false);
    }
  }

  //handle text box colour change

  function handleColourChange(eventHappens) {
    let numOfConditionsMet = 0;
    if (containsUpperCase) {
      numOfConditionsMet++;
    }
    if (containsLowerCase) {
      numOfConditionsMet++;
    }
    if (containsSpecialChar) {
      numOfConditionsMet++;
    }
    if (containsNum) {
      numOfConditionsMet++;
    }
    if (isValidLength) {
      numOfConditionsMet++;
    }

    let inputColor;

    switch (numOfConditionsMet) {
      case 5:
        inputColor = "#009900";
        break;
      case 4:
        inputColor = "#00CC00";
        break;
      case 3:
        inputColor = "#66FF66";
        break;
      case 2:
        inputColor = "#99FF99";
        break;
      case 1:
        inputColor = "#CCFFCC";
        break;
      default:
        inputColor = "#df386f";
        break;
    }

    document.querySelectorAll(".password-input").forEach((input) => {
      input.style.backgroundColor = inputColor;
    });
  }

  //called on Submit click
  function handlePasswordChange() {
    if (newPasswordState === confirmPasswordState) {
      if (!containsUpperCase) {
        window.alert("Password must contain an uppercase letter.");
      } else if (!containsLowerCase) {
        window.alert("Password must contain a lowercase letter.");
      } else if (!containsSpecialChar) {
        window.alert("Password must contain a special character.");
      } else if (!containsNum) {
        window.alert("Password must contain a number.");
      } else if (!isValidLength) {
        window.alert("Password must be between 8 and 16 characters.");
      } else {
        setNewPassword(newPasswordState);
      }
    } else {
      window.alert("Please enter passwords that match.");
    }
  }
  console.log(
    "newPasswordState in Change password component is: " + newPasswordState
  );
  //return DOM elements here
  return (
    <div className="change password">
      <nav>
        {" "}
        <h1>Password Change</h1>
      </nav>
      <div className="display">
        <text>Enter New Password:</text>

        <br></br>
        <input
          className="password-input"
          type={showPassword ? "text" : "password"}
          placeholder="New Password"
          onChange={(eventHappens) => {
            setNewPasswordState(eventHappens.target.value);
            handleColourChange(eventHappens);
            checkPasswordIsValid();
          }}
        />
        <br></br>
        <text>Confirm New Password:</text>
        <br></br>
        <input
          className="password-input"
          type={showPassword ? "text" : "password"}
          placeholder="Confirm Password"
          onChange={(eventHappens) => {
            setConfirmPasswordState(eventHappens.target.value);
            handleColourChange(eventHappens);
            checkPasswordIsValid();
          }}
        />

        <div>
          {!containsUpperCase ? (
            <span className="invalid-input-message">
              Must contain upper case
            </span>
          ) : (
            <span className="valid-input-message">Contains upper case!</span>
          )}
          <br />
          {!containsLowerCase ? (
            <span className="invalid-input-message">
              Must contain lower case
            </span>
          ) : (
            <span className="valid-input-message">Contains lower case!</span>
          )}
          <br />
          {!containsSpecialChar ? (
            <span className="invalid-input-message">
              Must contain spec char
            </span>
          ) : (
            <span className="valid-input-message">
              Contains a special character!
            </span>
          )}
          <br />
          {!containsNum ? (
            <span className="invalid-input-message">Must contain num</span>
          ) : (
            <span className="valid-input-message">Contains a number!</span>
          )}
          <br />
          {!isValidLength ? (
            <span className="invalid-input-message">
              Must be between 8 and 16 characters
            </span>
          ) : (
            <span className="valid-input-message">
              Is between 8 and 16 characters!
            </span>
          )}
          <br />
          {newPasswordState !== confirmPasswordState ? (
            <span className="invalid-input-message">Passwords must match</span>
          ) : (
            <span className="valid-input-message">Passwords match!</span>
          )}
          <br />
          <button onClick={handlePasswordVisibility}>
            {showPassword ? "Hide Passwords" : "Show Passwords"}
          </button>
          <button onClick={handlePasswordChange}>Submit</button>
          <br />
        </div>
      </div>
    </div>
  );
}
