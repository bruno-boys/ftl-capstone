import "./Register.css";

import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register({user, setUser}) {
  const [newUser, setNewUser] = useState(null);
  const navigate = useNavigate()

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
        setUser(res.data.user);
        navigate('/activity')
      })
      .catch((err) => {
        console.log(err);
      })
  };


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
        <input type="submit" value="Register" onClick={handleOnSubmit} />
      </form>
    </div>
  );
}
