import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import apiClient from "../../services/apiClient";


export default function Login() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    userName: "",
    password: "",
  });


  const handleOnInputChange = (event) => {
    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const {data, error} = await apiClient.loginUser(form)
    if (error) { setErrors(error) }
    if (data?.user) {
      setForm(null);
      apiClient.setToken(data.token)
      localStorage.setItem("firstname", data.user.firstName);
      localStorage.setItem("lastname", data.user.lastName);
      localStorage.setItem("email", data.user.email);
      navigate('/activity')
    };
  };
  return (
    <div className="Login">
      <div className="card">
        <h2> Login </h2>

        {<span className="error">{errors?.data?.error?.message}</span>}

        <br />
        <div className="form">
          <div className="input-field">
            <label htmlFor="userName">Username</label>
            <input
              type="text"
              name="email"
              placeholder="your_username"
              value={form.userName}
              onChange={handleOnInputChange}
            />
            {errors.userName && (
              <span className="error">{errors.userName}</span>
            )}
          </div>

          <div className="input-field">
            <label htmlFor="password"> Password</label>
            <input
              type="password"
              name="password"
              placeholder="password"
              value={form.password}
              onChange={handleOnInputChange}
            />
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
          </div>

          <button className="btn" onClick={handleOnSubmit}>
            {" "}
            Login{" "}
          </button>
        </div>

        <div className="footer">
          <p>
            Don't have an account? Sign up <Link to="/register">here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
