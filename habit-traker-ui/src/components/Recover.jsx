import React from "react";

import { useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../services/apiClient";

import Header from "../partials/Header";

function Recover() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState(null);
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(null);

  const handleOnSubmit = async (event) => {
    setIsProcessing(true);
    setErrors(null);

    if (!email) {
      setErrors({ email: "Please enter an email address." });
      setIsProcessing(false);
      console.log("No Email entered");
      return;
    }

    const { data, error } = await apiClient.recoverAccount({ email: email });
    if (error) setErrors(error);
    if (data?.message) {
      setMessage(data.message);
    }

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

              {/* Form */}
              <div className="max-w-sm mx-auto">
                {message ? (
                  <div className="message">
                    <h1 className="h1 mb-4">{message}</h1>
                  </div>
                ) : (
                  <>
                    <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                      <h1 className="h1 mb-4">
                        Let’s get you back up on your feet
                      </h1>
                      <p className="text-xl text-gray-600">
                        Enter the email address you used when you signed up for
                        your account, and we’ll email you a link to reset your
                        password.
                      </p>
                    </div>
                    <form>
                      <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full px-3">
                          <label
                            className="block text-gray-800 text-sm font-medium mb-1"
                            htmlFor="email"
                          >
                            Email <span className="text-red-600">*</span>
                          </label>
                          <input
                            id="email"
                            type="email"
                            className="form-input w-full text-gray-800"
                            placeholder="Enter your email address"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3 mt-6">
                        <div className="w-full px-3">
                          <button
                            className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                            disabled={isProcessing}
                            onClick={handleOnSubmit}
                          >
                            {isProcessing ? "Loading..." : "Send reset link"}
                          </button>
                        </div>
                      </div>
                    </form>
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

export default Recover;
