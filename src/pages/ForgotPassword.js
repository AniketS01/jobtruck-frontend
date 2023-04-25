import React, { useRef } from "react";
import { UserAuth } from "../context/AuthContext";

const ForgotPassword = () => {
  const { forgotPassword } = UserAuth();
  const emailRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(emailRef.current.value);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <section class="bg-gray-50">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0 bg-gray-800">
        <p className="text-3xl text-white font-bold">
          <span className="text-green-500">JOB</span>TRUCK
        </p>
        <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in to your account
            </h1>
            <form class="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  ref={emailRef}
                  name="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  required=""
                />
              </div>

              <button
                type="submit"
                onClick={handleSubmit}
                class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-gray-800"
              >
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
