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
import apiClient from "../../services/apiClient";

export default function App() {
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const [error, setError] = useState()

  useEffect(() => {
    const getUserInfo = async () => {
      const { data, err } = await apiClient.fetchUserFromToken();
      if (err) {
        setError(err);
      }
      if (data.user) {
        setUser(data.user);

      }
    };
    getUserInfo()
  }, []);


  const isAuthenticated = Boolean(user?.id)

  

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login user={user} setUser={setUser} />} />
              <Route path="/register" element={<Register user={user} setUser={setUser} />} />
              <Route path="/activity" element={<Activity isAuthenticated = {isAuthenticated} />} />
              <Route path="/habit/:habitId" element={<HabitDetailPage isAuthenticated = {isAuthenticated} />} />
              <Route path="/habit-form" element = { < HabitForm isAuthenticated = {isAuthenticated}/>} />
              <Route path = "/user-profile" element = {<UserProfile user = {user} isAuthenticated = {isAuthenticated}/>} />
              <Route path = "habit/edit/:habitId" element = {<EditForm isAuthenticated = {isAuthenticated}/>} />
        
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}
