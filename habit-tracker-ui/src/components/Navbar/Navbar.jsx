import "./Navbar.css";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {

  const navigate = useNavigate();

  const handleLogout = async (event) => {
    event.preventDefault();
    localStorage.removeItem("habit_tracker_token");
    navigate('/');
    
  }


  return (
    <nav className="navbar">
      <div className="content">
        <div className="logo">
          <Link to="/">Logo</Link>
        </div>
        <ul className="links">
        {
          !localStorage.getItem("habit_tracker_token") ? 
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <a href="/register">Sign Up</a>
            </li>
          </>
          :
          <li>
            <a onClick={handleLogout}>Sign Out</a>
          </li>
        }
        </ul>
      </div>
    </nav>
  );
}
