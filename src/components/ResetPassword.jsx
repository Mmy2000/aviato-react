import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import axios from "axios";
import { Helmet } from "react-helmet";


const ResetPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const steps = ["Enter Email", "Verify OTP", "Success"];

  // Utility: Reset all states
  const resetForm = () => {
    setEmail("");
    setOtp("");
    setNewPassword("");
    setError(null);
    setSuccessMessage("");
    setStep(1);
  };

  // Handle email submission for OTP
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/accounts/api/password-reset/`,
        { email }
      );
      setSuccessMessage(
        response.data.message || "OTP has been sent to your email."
      );
      setStep(2);
    } catch (err) {
      setError(
        err.response?.data?.email ||
          err.response?.data?.error ||
          "Failed to send OTP. Please check your email and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP and password submission
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/accounts/api/password-reset-confirm/`,
        {
          email,
          otp,
          new_password: newPassword,
        }
      );
      setSuccessMessage(response.data.message || "Password reset successful.");
      setStep(3);
    } catch (err) {
      setError(
        err.response?.data?.otp ||
          err.response?.data?.error ||
          "Invalid OTP or error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Navigate to login page after a delay in Step 3
  useEffect(() => {
    if (step === 3) {
      const timer = setTimeout(() => {
        navigate("/login"); // Navigate to login page
      }, 3000); // Delay of 3 seconds

      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [step, navigate]);

  // Step Slider Component
  const StepSlider = () => (
    <div className="relative flex items-center justify-between mb-8">
      {steps.map((label, index) => (
        <div
          key={index}
          className="flex flex-col items-center w-1/3 relative"
          style={{ zIndex: 2 }}
        >
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
              step === index + 1
                ? "bg-blue-600 text-white dark:bg-blue-500"
                : step > index + 1
                  ? "bg-green-500 text-white"
                  : "bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
            }`}
          >
            {index + 1}
          </div>
          <p
            className={`mt-2 text-sm ${
              step === index + 1
                ? "text-blue-600 font-semibold dark:text-blue-400"
                : "text-gray-600 dark:text-gray-300"
            }`}
          >
            {label}
          </p>
        </div>
      ))}

      <div className="absolute left-5 right-5 top-5 h-1 bg-gray-300 dark:bg-gray-600"></div>
      <div
        className="absolute left-5 top-5 h-1 bg-blue-600 dark:bg-blue-500 transition-all duration-300"
        style={{
          width: `${((step - 1) / (steps.length - 1)) * 100}%`,
        }}
      ></div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Aviato | Reset Password</title>
      </Helmet>
      <div className="max-w-lg mx-auto p-8 my-6 bg-white shadow-md rounded-lg dark:bg-gray-800 dark:text-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
          Reset Your Password
        </h2>

        {/* Step Slider */}
        <StepSlider />

        {/* Display Error or Success Messages */}
        {error && (
          <div className="text-red-600 dark:text-red-400 text-sm text-center mb-4">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="text-green-600 dark:text-green-400 text-xl font-medium text-center mb-4">
            {successMessage}
          </div>
        )}

        {/* Step 1: Enter Email */}
        {step === 1 && (
          <form onSubmit={handleRequestOtp}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-400 dark:text-gray-300"
                placeholder="Enter your email"
                required
              />
            </div>
            <button
              type="submit"
              className={`w-full py-2 rounded-md font-semibold flex items-center justify-center gap-2 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed dark:bg-gray-600"
                  : "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              } transition`}
              disabled={loading}
            >
              {loading && (
                <svg
                  className="w-5 h-5 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              )}
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        )}

        {/* Step 2: Verify OTP and Enter New Password */}
        {step === 2 && (
          <form onSubmit={handleResetPassword}>
            <div className="mb-6">
              <label
                htmlFor="otp"
                className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
              >
                OTP Code
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-400 dark:text-gray-300"
                placeholder="Enter the OTP"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="new-password"
                className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
              >
                New Password
              </label>
              <input
                type="password"
                id="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-400 dark:text-gray-300"
                placeholder="Enter your new password"
                minLength="8"
                required
              />
            </div>
            <button
              type="submit"
              className={`w-full py-2 rounded-md font-semibold flex items-center justify-center gap-2 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed dark:bg-gray-600"
                  : "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              } transition`}
              disabled={loading}
            >
              {loading && (
                <svg
                  className="w-5 h-5 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              )}
              {loading ? "Resetting Password..." : "Reset Password"}
            </button>
          </form>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <div className="text-center">
            <div className="flex items-center justify-center">
              <svg
                className="w-6 h-6 animate-spin text-green-600 dark:text-green-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            </div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Redirecting to the login page...
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default ResetPassword;
