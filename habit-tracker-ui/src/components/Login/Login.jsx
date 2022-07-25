import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import apiClient from "../../services/apiClient";


export default function Login({ user, setUser }) {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    userName: "",
    password: "",
  });

  useEffect(() => {
    if (user?.userName) {
      navigate("/activity");
    }
  }, [user, navigate]);

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
      navigate('/activity')
    };
  };

  return (
    <div className="Login">
      <div className="card">
        <h2> Login </h2>

        {errors.form && <span className="error">{errors.form}</span>}

        <br />
        <div className="form">
          <div className="input-field">
            <label htmlFor="userName">Username</label>
            <input
              type="text"
              name="userName"
              placeholder="Username"
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
              placeholder="Password"
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
