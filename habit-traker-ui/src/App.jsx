import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "aos/dist/aos.css";
import "./css/style.css";

import AOS from "aos";

import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Recover from "./components/Recover";
import Dashboard from "../src/components/Dashboard/Dashboard";
import UserProfile from "../src/components/UserProfile/UserProfile";
import HabitDetails from "./components/HabitDetails/HabitDetails";
import HabitPage from "./components/HabitPage/HabitPage";
import ResetPassword from "../src/components/ResetPassword";
import BuddyLink from "./components/BuddyLink";
import BuddyDecision from "./components/BuddyDecision";
import ErrorPage from "./ErrorPage";
import Resources from "./components/Resources/Resources";

function App({ send }) {
	const location = useLocation();
	const [fromLink, setFromLink] = useState(true);
	const [buddies, setBuddies] = useState();

	useEffect(() => {
		AOS.init({
			once: true,
			disable: "phone",
			duration: 700,
			easing: "ease-out-cubic",
		});
	});

	useEffect(() => {
		document.querySelector("html").style.scrollBehavior = "auto";
		window.scroll({ top: 0 });
		document.querySelector("html").style.scrollBehavior = "";
	}, [location.pathname]); // triggered on route change

	return (
		<>
			<Routes>
				<Route exact path='/' element={<Home />} />
				<Route path='/signin' element={<SignIn />} />
				<Route path='/signup' element={<SignUp />} />
				<Route path='/recover' element={<Recover />} />
				<Route path='/activity' element={<Dashboard buddy={buddies} setBuddy={setBuddies} send={send} />} />
				<Route path='/habits' element={<HabitPage />} />
				<Route path='/habit/:habitId' element={<HabitDetails buddy={buddies} setBuddy={setBuddies} />} />
				<Route path='/user-profile' element={<UserProfile buddies={buddies} setBuddies={setBuddies} />} />
				<Route path='/reset-password' element={<ResetPassword />} />
				<Route path='/buddy-link' element={<BuddyLink />} />
				<Route path='/resources' element={<Resources />} />
				<Route path='/buddy/:buddyId' element={!localStorage.getItem("habit_traker_token") ? <SignIn fromLink={fromLink} /> : <BuddyDecision />} />
				<Route path='/*' element={<ErrorPage />} />
			</Routes>
		</>
	);
}

export default App;
