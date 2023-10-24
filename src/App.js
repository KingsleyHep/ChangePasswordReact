import "./styles.css";
import React, { useEffect, useState } from "react";
import Login from "./forms/Login.jsx";
import ChangePassword from "./forms/ChangePassword";

//useEffect to mount separate components?

export default function App() {
  //declare variables here
  const [userName, setUserName] = useState("John");
  const [password, setPassword] = useState("password");
  console.log("password in app is currently: " + password);
  //refactor to put mockuser here
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  console.log("isAuthenticated in App is currently: " + isAuthenticated);

  const handleAuthentication = () => {
    mockDBValidation(userName, password)
      .then((isValid) => {
        setIsAuthenticated(isValid);
      })
      .catch((error) => {
        console.error("Error during authentication:", error);
      });
  };

  const [shouldUpdatePassword, setUpdatePassword] = useState(false);

  //conflict between here and change password handlePasswordChange()
  //onPasswordsMatch passed to ChangePassword as prop
  const handleChangePassword = (value) => {
    setPassword(value);
    setUpdatePassword(true);
    setIsAuthenticated(false);
  };

  //return to login once password changes
  useEffect(() => {
    setIsAuthenticated(false);
  }, [password]);

  function mockDBValidation(userName, password) {
    return new Promise((resolve, reject) => {
      const mockUser = {
        username: userName,
        password: password
      };

      if (userName === mockUser.username && password === mockUser.password) {
        resolve(true);
      } else {
        reject(new Error("Invalid username or password"));
      }
    });
  }
  //format render here
  return (
    <div className="App">
      {!isAuthenticated ? (
        <Login
          onAuthentication={handleAuthentication}
          userName={userName}
          password={password}
        />
      ) : (
        <ChangePassword setNewPassword={handleChangePassword} />
      )}
    </div>
  );
}
//revert to login
