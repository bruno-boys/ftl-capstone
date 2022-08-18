import React from "react";
import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import Header from "../partials/Header";
import { useParams, useNavigate } from "react-router-dom";
import ErrorPage from "../ErrorPage";

export default function BuddyDecision() {
	const [errors, setErrors] = useState(null);
	const [message, setMessage] = useState(null);
	const [accepted, setAccepted] = useState();
	const [buddy, setBuddy] = useState();
	const navigate = useNavigate();
	const { buddyId } = useParams();
	const url = {
		link: `http://localhost:5173/buddy/${buddyId}`,
	};

	useEffect(() => {
		async function getBuddyName() {
			const { data, error } = await apiClient.fetchNameFromLink(url.link);
			if (error) {
				setErrors(error);
			}
			if (data?.name) {
				setBuddy(data.name);
			}
		}
		getBuddyName();
	}, []);

	const acceptInvitation = async (event) => {
		event.preventDefault();
		const { data, error } = await apiClient.acceptBuddyRequest(url);
		if (error) {
			setErrors(error.data.error.message);
		}
		if (data) {
			setMessage("You and your Buddy have been matched!");
			setAccepted(true);
			localStorage.removeItem("buddyId");
			localStorage.removeItem("fromLink");
		}
	};

	const declineInvitation = async (event) => {
		event.preventDefault();
		const { data, error } = await apiClient.declineBuddyRequest(url);
		if (error) {
			setErrors(error);
		}
		if (data) {
			setMessage("The Buddy Request has been Declined");
			setAccepted(false);
			localStorage.removeItem("buddyId");
			localStorage.removeItem("fromLink");
		}
	};

	return !buddy ? (
		<ErrorPage />
	) : (
		<div className='flex flex-col min-h-screen overflow-hidden'>
			{/*  Site header */}
			<Header />
			{/*  Page content */}
			<main className='flex-grow'>
				<section className='bg-gradient-to-b from-gray-100 to-white'>
					<div className='max-w-6xl mx-auto px-4 sm:px-6'>
						<div className='pt-32 pb-12 md:pt-40 md:pb-20'>
							{/* Page header */}
							<div className='max-w-3xl mx-auto text-center pb-12 md:pb-20'>
								{message && buddy ? (
									<h1 className='h1'>{message}</h1>
								) : (
									<h1 className='h1'>
										{buddy?.first_name} {buddy?.last_name} has invited you to become Buddies
									</h1>
								)}

								{accepted == undefined && !errors ? (
									<>
										<p className='text-xl text-gray-600'>
											Accept this invitation to view your buddy's profile, habits, progress. Everything is better with a friend!
										</p>
										<div className='buddy-decision-btns' style={{ marginTop: "3rem", display: "flex", justifyContent: "center", gap: "1.5rem" }}>
											<button
												className='btn text-white bg-blue-600 hover:bg-blue-700 w-half'
												style={{ maxHeight: "50px", width: "20%" }}
												onClick={acceptInvitation}>
												Accept
											</button>
											<button
												className='btn text-white bg-red-600 hover:bg-red-700 w-half'
												style={{ maxHeight: "50px", width: "20%" }}
												onClick={declineInvitation}>
												Decline
											</button>
										</div>
									</>
								) : accepted == true && !errors ? (
									<>
										<p className='text-xl text-gray-600'>Return to HabitTraker to see their information!</p>
										<div className='buddy-decision-btns' style={{ marginTop: "3rem", display: "flex", justifyContent: "center", gap: "1.5rem" }}>
											<button
												className='btn text-white bg-gray-600 hover:bg-gray-700 w-half'
												style={{ maxHeight: "50px", width: "fit-content" }}
												onClick={() => {
													navigate("/activity");
												}}>
												My Dashboard
											</button>
										</div>
									</>
								) : accepted == false && !errors ? (
									<>
										<p className='text-xl text-gray-600'>Return to HabitTraker</p>
										<div className='buddy-decision-btns' style={{ marginTop: "3rem", display: "flex", justifyContent: "center", gap: "1.5rem" }}>
											<button
												className='btn text-white bg-gray-600 hover:bg-gray-700 w-half'
												style={{ maxHeight: "50px", width: "fit-content" }}
												onClick={() => {
													navigate("/activity");
												}}>
												My Dashboard
											</button>
										</div>
									</>
								) : (
									<>
										<p className='text-xl text-gray-600' style={{ color: "red" }}>
											{errors} Return to Dashboard.
										</p>
										<div className='buddy-decision-btns' style={{ marginTop: "3rem", display: "flex", justifyContent: "center", gap: "1.5rem" }}>
											<button
												className='btn text-white bg-gray-600 hover:bg-gray-700 w-half'
												style={{ maxHeight: "50px", width: "fit-content" }}
												onClick={() => {
													navigate("/activity");
												}}>
												My Dashboard
											</button>
										</div>
									</>
								)}
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}
