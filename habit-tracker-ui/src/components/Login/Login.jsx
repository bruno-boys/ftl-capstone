import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
export default function Login({ user, setUser }) {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    userName: "",
    password: "",
  });

  useEffect(() => {
    // if user is already logged in,
    // redirect them to the home page
    if (user?.userName) {
      navigate("/activity");
    }
  }, [user, navigate]);

  const handleOnInputChange = (event) => {
    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  const handleOnSubmit = async () => {
    setIsProcessing(true);
    setErrors((e) => ({ ...e, form: null }));

    try {
      const res = await axios.post("http://localhost:3001/auth/login", form);
      if (res?.data?.user) {
        setUser(res.data.user);
      } else {
        setErrors((e) => ({
          ...e,
          form: "Invalid username/password combination",
        }));
      }
    } catch (err) {
      console.log(err);
      setErrors((e) => ({
        ...e,
        form: "Invalid username/password combination",
      }));
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    console.log("user", user)
  }, [user])

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
              placeholder="userName"
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
