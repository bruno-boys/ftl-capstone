import "./Navbar.css";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async (event) => {
    event.preventDefault();
    localStorage.removeItem("habit_tracker_token");
    localStorage.removeItem("firstname");
    localStorage.removeItem("lastname");
    localStorage.removeItem("email");
    navigate("/");
  };


  return (
    <nav className="navbar">
      <div className="content">
        <div className="logo">

          {
            !localStorage.getItem("habit_tracker_token") ? 
             <Link to="/">
            <img
              id="logo"
              src="https://is5-ssl.mzstatic.com/image/thumb/Purple115/v4/e6/4d/3d/e64d3d18-9740-8690-7e6f-fa8dd156240d/source/256x256bb.jpg"
              alt="habit-tracker-logo"
              className="landing-page-logo"
            />
          </Link>
            :
             <Link to="/activity">
            <img
              id="logo"
              src="https://is5-ssl.mzstatic.com/image/thumb/Purple115/v4/e6/4d/3d/e64d3d18-9740-8690-7e6f-fa8dd156240d/source/256x256bb.jpg"
              alt="habit-tracker-logo"
              className="landing-page-logo"
            />
          </Link>
          }
          
        </div>
        <ul className="links">
          {!localStorage.getItem("habit_tracker_token") ? (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <a href="/register">Sign Up</a>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/activity">Activity</Link>
              </li>
              <li>
                <Link to="/habit">Habits</Link>
              </li>
              <li>
                <Link to="/user-profile">User Profile</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Sign Out</a>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
