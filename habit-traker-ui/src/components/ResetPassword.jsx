import React from 'react';
import { Link, useNavigate, useLocation} from 'react-router-dom';
import { useState, useEffect } from "react";
import Header from '../partials/Header';
import apiClient from "../services/apiClient";


function ResetPassword() {
    const [isProcessing, setIsProcessing] = useState(false);
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState(null);
    const [form, setForm] = useState({
      password: "",
      passwordConfirmation: "",
    });



  const handleOnChange = (event) => {
    if (event.target.name === "passwordConfirm") {
      if (event.target.value !== form.password) {
        setErrors((e) => ({
          ...e,
          passwordConfirm: "Passwords do not match.",
        }));
      } else {
        setErrors((e) => ({ ...e, passwordConfirm: null }));
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };
  const location = useLocation();
  console.log({ location });
  const searchParams = new URLSearchParams(location.search);
  console.log({ searchParams: searchParams.toString() })
  const token = searchParams.get("token");
  console.log("token before function", token)

  const handleOnResetSubmit = async (event) => {
    setIsProcessing(true);
    event.preventDefault()
    setErrors((e) => ({ ...e, form: null }));
    console.log("token:", token)
    const { data, error } = await apiClient.resetPassword({
      token,
      newPassword: form.password,
    });
  
    if (error) setErrors((e) => ({ ...e, form: error }));
    if (data?.message) 
    setMessage(data.message);

    setIsProcessing(false);
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
                <h1 className="h1">Reset Password</h1>
              </div>

              {/* Form */}
              {message ? (
                <>
                    <span className="message">{message}</span>
                    <br/>
                    <p>
                        Login <Link to="/signin">here</Link>
                    </p>
                </>
            ) : (
                <div className="max-w-sm mx-auto">
                <form>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="password">Password</label>
                      <input name="password" type="password" className="form-input w-full text-gray-800" placeholder="Enter a secure password" value={form.password} onChange={handleOnChange} required />
                     {errors.password && (<span className="error">{errors.password}</span>)}
                     </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <div className="flex justify-between">
                        <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="password">Confirm Password</label>
                      </div>
                      <input name="confirmPassword" type="password" className="form-input w-full text-gray-800" placeholder="Confirm your password" value={form.passwordConfirm} onChange={handleOnChange} required />
                      {errors.passwordConfirm && (<span className="error">{errors.passwordConfirm}</span>)}
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                        <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full" onClick={handleOnResetSubmit}>
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