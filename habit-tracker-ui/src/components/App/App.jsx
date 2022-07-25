import * as React from "react";
import { useState } from "react";
import "./App.css";
import Navbar from "../Navbar/Navbar";
import LandingPage from "../LandingPage/LandingPage";
import Register from "../Register/Register";
import Login from "../Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  const [user, setUser] = useState({});
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/login"
              element={<Login user={user} setUser={setUser} />}
            />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}
