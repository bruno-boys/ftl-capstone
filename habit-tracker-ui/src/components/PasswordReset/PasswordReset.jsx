import { useLocation, Link } from "react-router-dom";
import apiClient from "../../services/apiClient";
import { useState } from "react";

import React from "react";

export default function PasswordReset() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    password: "",
    passwordConfirmation: "",
  });

  const handleOnChange = (event) => {
    if (event.target.name === "passwordConfirm") {
      if (event.target.value !== form.password) {
        setErrors((e) => ({
          ...e,
          passwordConfirm: "Passwords do not match.",
        }));
      } else {
        setErrors((e) => ({ ...e, passwordConfirm: null }));
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  const handleOnSubmit = async () => {
    setIsProcessing(true);
    setErrors((e) => ({ ...e, form: null }));

    const { data, error } = await apiClient.resetPassword({
      token,
      newPassword: form.password,
    });
    if (error) setErrors((e) => ({ ...e, form: error }));
    if (data?.message) setMessage(data.message);

    setIsProcessing(false);
  };

  const location = useLocation();
  console.log({ location });
  const searchParams = new URLSearchParams(location.search);
  console.log({ searchParams: searchParams.toString() });
  const token = searchParams.get("token");
  console.log({ token });

  return (
    <div>
      <h2>Reset Password</h2>
      {/* {errors.form && <span className="error">{errors.form}</span>} */}
      <br />
      <div className="form">
        {message ? (
          <>
            <span className="message">{message}</span>
            <br />
            <p>
              Login <Link to="/login">here</Link>
            </p>
          </>
        ) : (
          <>
            <div className="input-field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter a secure Password"
                value={form.password}
                onChange={handleOnChange}
              />
              {errors.password && (
                <span className="error">{errors.password}</span>
              )}
            </div>

            <div className="input-field">
              <label htmlFor="confirm-assword">Confirm Password</label>
              <input
                type="password"
                name="passwordConfirm"
                placeholder="Confirm your password"
                value={form.passwordConfirm}
                onChange={handleOnChange}
              />
              {errors.passwordConfirm && (
                <span className="error">{errors.passwordConfirm}</span>
              )}
            </div>

            <button className="btn" onClick={handleOnSubmit}>
              {" "}
              Save Password{" "}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
