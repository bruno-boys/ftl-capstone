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
      navigate("/activity");
    }
  };

  console.log("Error new", error);
  return (
    <div className="register">
      <h1>Register</h1>
      {error.form && <span className="error">{error.form}</span>}
      <form className="registerForm" onChange={handleOnFormChange}>
        <label>
          First Name:
          <input type="text" name="firstName" />
        </label>
        <label>
          Last Name:
          <input type="text" name="lastName" />
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
        {error.email && <span className="error">{error.email}</span>}
        <label>
          Phone Number:
          <input type="tel" name="phoneNumber" />
        </label>
        <label>
          Username:
          <input type="text" name="userName" />
        </label>
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        {error.password && <span className="error">{error.password}</span>}
        <label>
          Confirm Password:
          <input type="password" name="passwordConfirm" />
        </label>
        {error.passwordConfirm && (
          <span className="error">{error.passwordConfirm}</span>
        )}
        <input type="submit" value="Register" onClick={handleOnSubmit} />
      </form>
      <div className="footer">
        <p>
          Alreay have an account? Log in <Link to="/login">here</Link>
        </p>
      </div>
    </div>
  );
}
