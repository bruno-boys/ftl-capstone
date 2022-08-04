import React, { useEffect, useState } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import 'aos/dist/aos.css';
import './css/style.css';

import AOS from 'aos';

import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Recover from './components/Recover';
import Dashboard from '../src/components/Dashboard/Dashboard';
import UserProfile from '../src/components/UserProfile/UserProfile'
import ResetPassword from '../src/components/ResetPassword'

function App() {

  const location = useLocation();

  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 700,
      easing: 'ease-out-cubic',
    });
  });

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/recover" element={<Recover />} />
        <Route path="/activity" element={<Dashboard />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/reset-password" element={<ResetPassword />} />

      </Routes>
    </>
  );
}

export default App;
