import React, { useEffect, useState } from 'react';
import {
  Routes,
  Route,
  useLocation,
  BrowserRouter
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
import HabitDetails from './components/HabitDetails/HabitDetails';
import HabitPage from './components/HabitPage/HabitPage';
import ResetPassword from '../src/components/ResetPassword'
import BuddyLink from './components/BuddyLink';
import BuddyDecision from './components/BuddyDecision';
import ErrorPage from './ErrorPage';
import Resources from './components/Resources/Resources';
import Header from './partials/Header';
import Dummy from './components/Dummy/Dummy';

function App({ send }) {

  const location = useLocation();
  const [fromLink, setFromLink] = useState(true)

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
        <Route path="/activity" element={<Dashboard send={send} />} />
        <Route path="/habits" element={<HabitPage />} />
        <Route path="/habit/:habitId" element={<HabitDetails />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path='/buddy-link' element={<BuddyLink />} />
        <Route path = "/dummy" element = {<Resources />} />
        <Route path='/buddy/:buddyId' element={ !localStorage.getItem("habit_traker_token") ? <SignIn fromLink={fromLink} /> : <BuddyDecision />} />
        <Route path="/*" element={<ErrorPage/>} />
      </Routes>
    </>
  );
}

export default App;
