import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiClient from "../services/apiClient";
import Header from '../partials/Header';

function SignUp() {

  const [newUser, setNewUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);
  const { buddyId } = useParams();

    const togglePassword = (event) => {
      event.preventDefault()
      setPasswordShown(!passwordShown);
    };
  
  const handleOnFormChange = (event) => {
    if (event.target.name === "password") {
      if (newUser.passwordConfirm && newUser.passwordConfirm !== event.target.value) {
        setError((e) => ({ ...e, passwordConfirm: "Password's do not match" }));
      } else {
        setError((e) => ({ ...e, passwordConfirm: null }));
      }
    }
    if (event.target.name === "passwordConfirm") {
      if (newUser.password && newUser.password !== event.target.value) {
        setError((e) => ({ ...e, passwordConfirm: "Password's do not match" }));
      } else {
        setError((e) => ({ ...e, passwordConfirm: null }));
      }
    }
    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") === -1) {
        setError((e) => ({ ...e, email: "Please enter a valid email." }));
      } else {
        setError((e) => ({ ...e, email: null }));
      }
    }
    if (event.target.name === "phoneNumber") {
      if (event.target.value.length != 10) {
        setError((e) => ({ ...e, phoneNumber: "Please enter a valid phone number." }));
      } else {
        setError((e) => ({ ...e, phoneNumber: null }));
      }
    }
    setNewUser({
      ...newUser,
      [event.target.name]: event.target.value,
    });
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    if (newUser.passwordConfirm != newUser.password) {
      return null;
    }
    const { data, error } = await apiClient.registerUser(newUser);
    if (error) {
      setError(error);
    }
    if (data?.user) {
      localStorage.setItem("name", data.user.name);
      localStorage.setItem("email", data.user.email);
      apiClient.setToken(data.token);
      if (localStorage.getItem("fromLink") == "true") {
        navigate(`/buddy/${localStorage.getItem("buddyId")}`)
      }
      else { navigate('/activity') }
    };
  };


  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">

        <section className="bg-gradient-to-b from-gray-100 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">

              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">Welcome.</h1>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form onSubmit={handleOnSubmit}>

                <div className="name-inputs" style={{display:"flex", gap:"0.5rem"}}>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="name">First Name<span className="text-red-600">*</span></label>
                      <input name="firstName" type="text" className="form-input w-full text-gray-800" placeholder="Enter your first name" onChange={handleOnFormChange} required />
                    </div>
                  </div>

                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="name">Last Name<span className="text-red-600">*</span></label>
                      <input name="lastName" type="text" className="form-input w-full text-gray-800" placeholder="Enter your last name" onChange={handleOnFormChange} required />
                    </div>
                  </div>
                </div>

                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">Email <span className="text-red-600">*</span></label>
                      {error.email ? <div className="error" style={{color:"red",fontSize:"13px"}}>{error.email}</div> :<></>}
                      <input name="email" type="email" className="form-input w-full text-gray-800" placeholder="Enter your email address" onChange={handleOnFormChange} required />
                    </div>
                  </div>

                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="password">Password <span className="text-red-600">*</span></label>
                      {error.password && <span className="error" style={{color:"red",fontSize:"13px"}}>{error.password}</span>}
                      <input name="password" type={ passwordShown ? "text" : "password"} className="form-input w-full text-gray-800" placeholder="Enter your password" onChange={handleOnFormChange} required />
                      <div style={{display:"flex", justifyContent:"flex-end"}}>
                        <button onClick={(event) => {togglePassword(event)}}>Show Password</button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="password">Confirm Password <span className="text-red-600">*</span></label>
                      {error.passwordConfirm && (<span className="error" style={{color:"red",fontSize:"13px"}}>{error.passwordConfirm}</span>)}
                      <input name="passwordConfirm" type={ passwordShown ? "text" : "password"} className="form-input w-full text-gray-800" placeholder="Confirm your password" onChange={handleOnFormChange} required />
                    </div>
                  </div>

                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full" onClick={handleOnSubmit}>Sign up</button>
                    </div>
                  </div>

                  <div className="text-sm text-gray-500 text-center mt-3">
                    By creating an account, you agree to the <a className="underline" href="#0">terms & conditions</a>, and our <a className="underline" href="#0">privacy policy</a>.
                                </div>
                </form>

                <div className="flex items-center my-6">
                  <div className="border-t border-gray-300 flex-grow mr-3" aria-hidden="true"></div>
                  <div className="text-gray-600 italic">Or</div>
                  <div className="border-t border-gray-300 flex-grow ml-3" aria-hidden="true"></div>
                </div>

                <form>
                  <div className="flex flex-wrap -mx-3">
                    <div className="w-full px-3">
                      <button className="btn px-0 text-white bg-red-600 hover:bg-red-700 w-full relative flex items-center">
                        <svg className="w-4 h-4 fill-current text-white opacity-75 flex-shrink-0 mx-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" />
                        </svg>
                        <span className="flex-auto pl-16 pr-8 -ml-16">Continue with Google</span>
                      </button>
                    </div>
                  </div>
                </form>

                <div className="text-gray-600 text-center mt-6">
                  Already using HabitTraker? <Link to="/signin" className="text-blue-600 hover:underline transition duration-150 ease-in-out">Sign in</Link>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

    </div>
  );
}


export default SignUp;