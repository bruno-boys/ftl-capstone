import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import Header from "../partials/Header";
import apiClient from "../services/apiClient";

function ResetPassword() {
	const [isProcessing, setIsProcessing] = useState(false);
	const [errors, setErrors] = useState({});
	const [message, setMessage] = useState(null);
	const [form, setForm] = useState({
		password: "",
		confirmPassword: "",
	});
	const [passwordShown, setPasswordShown] = useState(false);

	const togglePassword = (event) => {
		event.preventDefault();
		setPasswordShown(!passwordShown);
	};

	const handleOnChange = (event) => {
		if (event.target.name === "confirmPassword") {
			if (form.password && form.password !== event.target.value) {
				setErrors((e) => ({ ...e, confirmPassword: "Password's do not match" }));
			} else {
				setErrors((e) => ({ ...e, confirmPassword: null }));
			}
		}

		setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
	};
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const token = searchParams.get("token");

	const handleOnResetSubmit = async (event) => {
		setIsProcessing(true);
		event.preventDefault();
		if (form.confirmPassword != form.password) {
			return null;
		}
		const { data, error } = await apiClient.resetPassword({
			token,
			newPassword: form.password,
		});
		if (error) {
			setErrors(error.data.error);
		}
		if (data?.message) setMessage(data.message);

		setIsProcessing(false);
	};

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
								<h1 className='h1'>Reset Password</h1>
							</div>

							{/* Form */}
							{message ? (
								<>
									<h2 className='h1' style={{ fontSize: "20px" }}>
										{message}
									</h2>
									<br />
									<p>
										<Link to='/signin' className='btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3'>
											{" "}
											Login here
										</Link>
									</p>
								</>
							) : (
								<div className='max-w-sm mx-auto'>
									<form>
										<div className='flex flex-wrap -mx-3 mb-4'>
											<div className='w-full px-3'>
												<label className='block text-gray-800 text-sm font-medium mb-1' htmlFor='password'>
													Password
												</label>
												<input
													name='password'
													type={passwordShown ? "text" : "password"}
													className='form-input w-full text-gray-800'
													placeholder='Enter a secure password'
													value={form.password}
													onChange={handleOnChange}
													required
												/>
												<div style={{ display: "flex", justifyContent: "flex-end" }}>
													<button
														onClick={(event) => {
															togglePassword(event);
														}}>
														Show Password
													</button>
												</div>
												{errors.password && <span className='error'>{errors.password}</span>}
											</div>
										</div>
										<div className='flex flex-wrap -mx-3 mb-4'>
											<div className='w-full px-3'>
												<div className='flex justify-between'>
													<label className='block text-gray-800 text-sm font-medium mb-1' htmlFor='password'>
														Confirm Password
													</label>
												</div>
												{errors.confirmPassword && (
													<span className='error' style={{ color: "red", fontSize: "13px" }}>
														{errors.confirmPassword}
													</span>
												)}
												<input
													name='confirmPassword'
													type={passwordShown ? "text" : "password"}
													className='form-input w-full text-gray-800'
													placeholder='Confirm your password'
													value={form.passwordConfirm}
													onChange={handleOnChange}
													required
												/>
											</div>
										</div>
										<div className='flex flex-wrap -mx-3 mb-4'></div>
										<div className='flex flex-wrap -mx-3 mt-6'>
											<div className='w-full px-3'>
												<button className='btn text-white bg-blue-600 hover:bg-blue-700 w-full' onClick={handleOnResetSubmit}>
													{" "}
													Save Password{" "}
												</button>
											</div>
										</div>
									</form>
								</div>
							)}
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}

export default ResetPassword;
