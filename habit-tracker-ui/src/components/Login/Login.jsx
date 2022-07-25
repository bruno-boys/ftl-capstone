import "./Login.css";

import React from "react";

export default function Login() {
  return (
    <div className="Login">
      <div className="card">
        <h2> Login </h2>
        <div className="form">
        <div className="input-field">
          <label htmlFor="username">Username</label>
          <input type='text' name="username" placeholder="Username"/>
        </div>

        <div className="input-field">
          <label htmlFor="password"> Password</label>
          <input type='email' name = 'email' placeholder = 'Email' />

        </div>

        <button className="btn"> Login </button>

      </div>

      <div className="footer">
          <p>
            Don't have an account? Sign up
          </p>
        </div>
        </div>
    </div>
  );
}
