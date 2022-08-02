import "./Register.css";
import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import apiClient from "../../services/apiClient";
import { useEffect } from "react";

export default function Register({ user, setUser }) {
  const [newUser, setNewUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    userName: "",
    password: "",
    passwordConfirm: "",
  });

  const handleOnFormChange = (event) => {
    if (event.target.name === "password") {
      if (form.passwordConfirm && form.passwordConfirm !== event.target.value) {
        setError((e) => ({ ...e, passwordConfirm: "Password's do not match" }));
      } else {
        setError((e) => ({ ...e, passwordConfirm: null }));
      }
    }
    if (event.target.name === "passwordConfirm") {
      if (form.password && form.password !== event.target.value) {
        setError((e) => ({ ...e, passwordConfirm: "Password's do not match" }));
      } else {
        setError((e) => ({ ...e, passwordConfirm: null }));
      }
    }
    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") === -1) {
        setError((e) => ({ ...e, email: "Please enter a valid email." }));
      } else {
        setError((e) => ({ ...e, email: null }));
      }
    }
    if (event.target.name === "phoneNumber") {
      if (event.target.value.length != 10) {
        setError((e) => ({ ...e, phoneNumber: "Please enter a valid phone number." }));
      } else {
        setError((e) => ({ ...e, phoneNumber: null }));
      }
    }
    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
    setNewUser({
      ...newUser,
      [event.target.name]: event.target.value,
    });
  };
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const { data, error } = await apiClient.registerUser(newUser);
    if (error) {
      setError(error);
    }
    if (data?.user) {
      setNewUser(null);
      localStorage.setItem("firstname", data.user.firstName);
      localStorage.setItem("lastname", data.user.lastName);
      localStorage.setItem("email", data.user.email);
      apiClient.setToken(data.token);
      setTimeout(navigateToFeed, 1000)
    }
  };

  function navigateToFeed() {
    navigate('/activity')
  }

  return (
    <div className="register">
      <div className="card">
        <h2>Register</h2>

        {<span className="error">{error?.data?.error?.message}</span>}

        <br />
        <div className="register-form">

          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter a valid email"
              value={form.email}
              onChange={handleOnFormChange}
            />
            {error.email? <span className="error">{error.email}</span> : <></>}
          </div>

          <div className="input-field">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Enter a valid phone number (digits only)"
                value={form.phoneNumber}
                onChange={handleOnFormChange}
              />
          {error.phoneNumber?
                <div className="error">{error.phoneNumber}</div> : <></>
          }
          </div>

          <div className="input-field">
              <label htmlFor="userName">Username</label>
              <input
                type="text"
                name="userName"
                placeholder="your_username"
                value={form.userName}
                onChange={handleOnFormChange}
              />
          </div>

          <div className="input-field" id="name-field">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleOnFormChange}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleOnFormChange}
            />
          </div>

          <div className="input-field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter a secure Password"
                value={form.password}
                onChange={handleOnFormChange}
              />
              {error.password && <span className="error">{error.password}</span>}
          </div>

          <div className="input-field">
              <label htmlFor="confirm-assword">Confirm Password</label>
              <input
                type="password"
                name="passwordConfirm"
                placeholder="Confirm your password"
                value={form.passwordConfirm}
                onChange={handleOnFormChange}
              />
              {error.passwordConfirm && (
                <span className="error">{error.passwordConfirm}</span>
              )}
          </div>

          <button className="btn" onClick={handleOnSubmit}>
            {" "}
            Sign Up{" "}
          </button>
        </div>
        <div className="footer">
        <p>
          Alreay have an account? Log in <Link to="/login">here</Link>
        </p>
      </div>
      </div>
    </div>
  );
}
