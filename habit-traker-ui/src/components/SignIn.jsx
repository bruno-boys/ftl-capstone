import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../partials/Header";
import apiClient from "../services/apiClient";

function SignIn({ fromLink }) {
	const navigate = useNavigate();
	const [error, setError] = useState({});
	const [newUser, setNewUser] = useState(null);
	const { buddyId } = useParams();

	const handleOnFormChange = (event) => {
		setError("");
		if (event.target.name === "email") {
			if (event.target.value.indexOf("@") === -1) {
				setError((e) => ({ ...e, email: "Please enter a valid email." }));
			} else {
				setError((e) => ({ ...e, email: null }));
			}
		}
		setNewUser((f) => ({ ...f, [event.target.name]: event.target.value }));
	};

	const handleOnSubmit = async (event) => {
		event.preventDefault();
		const { data, error } = await apiClient.loginUser(newUser);
		if (error) {
			setError(error?.data?.error);
		}
		if (data?.user) {
			setNewUser(null);
			apiClient.setToken(data.token);
			localStorage.setItem("name", data.user.name);
			localStorage.setItem("email", data.user.email);
			localStorage.setItem("buddyView", "false");
			if (localStorage.getItem("fromLink") == "true") {
				navigate(`/buddy/${localStorage.getItem("buddyId")}`);
			} else {
				navigate("/activity");
			}
		}
	};

	useEffect(() => {
		localStorage.setItem("fromLink", fromLink);
		localStorage.setItem("buddyId", buddyId);
	}, []);

	return (
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
								<h1 className='h1'>Welcome back.</h1>
							</div>

							{/* Form */}
							<div className='max-w-sm mx-auto'>
								<form onSubmit={handleOnSubmit}>
									<div style={{ display: "flex", justifyContent: "center" }}>
										{error?.message && (
											<span className='error' style={{ color: "red", textAlign: "center", fontSize: "16px" }}>
												{error?.message}
											</span>
										)}
									</div>
									<div className='flex flex-wrap -mx-3 mb-4'>
										<div className='w-full px-3'>
											<label className='block text-gray-800 text-sm font-medium mb-1' htmlFor='email'>
												Email
											</label>
											{error?.email && (
												<span className='error' style={{ color: "red", fontSize: "13px" }}>
													{error?.email}
												</span>
											)}
											<input
												name='email'
												type='email'
												className='form-input w-full text-gray-800'
												placeholder='Enter your email address'
												onChange={handleOnFormChange}
												required
											/>
										</div>
									</div>
									<div className='flex flex-wrap -mx-3 mb-4'>
										<div className='w-full px-3'>
											<div className='flex justify-between'>
												<label className='block text-gray-800 text-sm font-medium mb-1' htmlFor='password'>
													Password
												</label>
												<Link to='/recover' className='text-sm font-medium text-blue-600 hover:underline'>
													Having trouble signing in?
												</Link>
											</div>
											<input
												name='password'
												type='password'
												className='form-input w-full text-gray-800'
												placeholder='Enter your password'
												onChange={handleOnFormChange}
												required
											/>
										</div>
									</div>
									<div className='flex flex-wrap -mx-3 mb-4'>
										<div className='w-full px-3'>
											<div className='flex justify-between'>
												<label className='flex items-center'>
													<input type='checkbox' className='form-checkbox' />
													<span className='text-gray-600 ml-2'>Keep me signed in</span>
												</label>
											</div>
										</div>
									</div>
									<div className='flex flex-wrap -mx-3 mt-6'>
										<div className='w-full px-3'>
											<button className='btn text-white bg-blue-600 hover:bg-blue-700 w-full' onClick={handleOnSubmit}>
												Sign in
											</button>
										</div>
									</div>
								</form>
								<div className='text-gray-600 text-center mt-6'>
									Don’t you have an account?{" "}
									<Link to='/signup' className='text-blue-600 hover:underline transition duration-150 ease-in-out'>
										Sign up
									</Link>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}

export default SignIn;
