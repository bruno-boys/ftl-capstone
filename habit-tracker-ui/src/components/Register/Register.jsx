import "./Register.css";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from '../../services/apiClient'
import { useEffect } from "react";

export default function Register({user, setUser}) {
  const [newUser, setNewUser] = useState(null);
  const [error, setError] = useState('')
  const navigate = useNavigate()


  const handleOnFormChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const {data, error} = await apiClient.registerUser(newUser)
    if (error) { setError(error) }
    if (data?.user) {
      setNewUser(null);
      apiClient.setToken(data.token)
      navigate('/activity')
    };
  }

  useEffect(() => {
    console.log('user = ', newUser)
  }, [newUser])


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
