import * as React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "../Navbar/Navbar";
import LandingPage from "../LandingPage/LandingPage";
import Register from "../Register/Register";
import Login from "../Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Activity from "../Activity/Activity";
import HabitPage from "../HabitPage/HabitPage";
import HabitDetailPage from "../HabitDetailPage/HabitDetailPage";
import HabitForm from "../HabitForm/HabitForm";
import UserProfile from "../UserProfile/UserProfile";
import EditForm from "../EditForm/EditForm";
import Recover from "../Recover/Recover";
import PasswordReset from "../PasswordReset/PasswordReset";

export default function App() {
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
          {!localStorage.getItem("habit_tracker_token") ?

            <>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login user={user} setUser={setUser} />} />
              <Route path="/register" element={<Register user={user} setUser={setUser} />} /> 
              <Route path="/activity" element={<Login user={user} setUser={setUser} />} />
              <Route path="/habit/:habitId" element={<Login user={user} setUser={setUser} />} />
              <Route path="/habit-form" element = { <Login user={user} setUser={setUser} />} />
              <Route path = "/user-profile" element = {<Login user={user} setUser={setUser} />} />
              <Route path = "habit/edit/:habitId" element = {<Login user={user} setUser={setUser} />} />
            </>
           
           :

            <>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login user={user} setUser={setUser} />} />
              <Route path="/register" element={<Register user={user} setUser={setUser} />} />
              <Route path="/activity" element={<Activity />} />
              <Route path="/recover" element={<Recover />} />
              <Route path="/reset-password" element={<PasswordReset />} />


              <Route path="/habit/:habitId" element={<HabitDetailPage />} />
              <Route path="/habit-form" element = { < HabitForm/>} />
              <Route path = "/user-profile" element = {<UserProfile user = {user}/>} />
              <Route path = "habit/edit/:habitId" element = {<EditForm />} />
            </>
        }
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}
