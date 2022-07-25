import "./Register.css";

import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function Register() {
  const [newUser, setNewUser] = useState(null);

  const handleOnFormChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:3001/auth/register", newUser)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
    console.log(newUser);
  };

  useEffect(() => {
    console.log("New User: ", newUser);
  });

  return (
    <div className="register">
      <h1>Register</h1>
      <form className="registerForm" onChange={handleOnFormChange}>
        <label>
          First Name:
          <input  type="text" name="firstName" />
        </label>
        <label>
          Last Name:
          <input  type="text" name="lastName" />
        </label>
        <label>
          Email:
          <input
            
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
        </label>
        <label>
          Phone Number:
          <input  type="tel" name="phoneNumber" />
        </label>
        <label>
          Username:
          <input  type="text" name="userName" />
        </label>
        <label>
          Password:
          <input  type="password" name="password" />
        </label>
        <label>
          Confirm Password:
          <input  type="password" name="confirmPassword" />
        </label>
      </form>
      <input type="submit" value="Register" onClick={handleOnSubmit} />
    </div>
  );
}
