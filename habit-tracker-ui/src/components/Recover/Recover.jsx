import { useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../../services/apiClient";

import "./Recover.css";

import React from "react";

export default function Recover() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState(null);
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(null);

  const handleOnSubmit = async (event) => {
    setIsProcessing(true);
    setErrors(null);

    if (!email) {
      setErrors({ email: "Please enter an email address." });
      setIsProcessing(false);
      return;
    }

    console.log ("email", email);
    const { data, error } = await apiClient.recoverAccount({email: email});
    if (error) setErrors(error);
    if (data?.message) {
      setMessage(data.message);
    }

    setIsProcessing(false);
  };

  return (
    <div className="Recover">
      <h2>Account Recovery</h2>

      {/* {errors && <div className="error">{errors}</div>} */}
      <div className="form">
        {message ? (
          <div className="message"><p>{message}</p></div>
        ) : (
          <div className="message">
            <p>Enter the email address associated with your account</p>
            <br />

            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter a valid email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              className="button"
              disabled={isProcessing}
              onClick={handleOnSubmit}
            >
              {isProcessing ? "Loading..." : "Recover Account"}
            </button>
          </div>
        )}
      </div>

      <div className="footer">
        <p>
          Need an account? Register <Link to="/register">here.</Link>
        </p>
      </div>
    </div>
  );
}

