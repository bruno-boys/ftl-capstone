import "./Navbar.css";
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="content">
        <div className="logo">
          <Link to="/">Logo</Link>
        </div>
        <ul className="links">
          <li>
            <Link to="/login">Login</Link>
          </li>

          <li>
            <a href="/register">Sign Up</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
