// RegisterPage.jsx
import { useState } from "react";
import { Transition } from "@headlessui/react";
import axios from "axios";

export default function Register() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone_number: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    // Frontend validation
    if (formData.first_name.trim() === "" || formData.last_name.trim() === "") {
      setError("First name and last name are required!");
      return;
    }
    if (!validateEmail(formData.email)) {
      setError("Invalid email format!");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long!");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // API request to backend
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/accounts/api/register/",
        {
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          password: formData.password,
          confirm_password: formData.confirmPassword,
          phone_number: formData.phone_number,
        }
      );
      console.log(response.data.data.tokens.access_token);
      

      setSuccessMessage("User registered successfully!");
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone_number: "",
      });
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Registration failed. Please check the details provided."
      );
      console.log(error);
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center dark:from-gray-800 px-4">
      <div className="w-full max-w-xl p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg space-y-8">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center">
          Create Your Account
        </h2>
        {error && (
          <div className="text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300 border border-red-500 rounded p-2 text-sm text-center">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300 border border-green-500 rounded p-2 text-sm text-center">
            {successMessage}
          </div>
        )}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex space-x-3">
            {/* First Name Field */}
            <div className="relative w-1/2">
              <label
                htmlFor="first_name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                id="first_name"
                onChange={handleChange}
                value={formData.first_name}
                className="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-indigo-400 focus:border-transparent dark:bg-gray-700 dark:text-white transition duration-200"
                placeholder="Enter your first name"
                required
              />
            </div>

            {/* Last Name Field */}
            <div className="relative w-1/2">
              <label
                htmlFor="last_name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                id="last_name"
                onChange={handleChange}
                value={formData.last_name}
                className="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-indigo-400 focus:border-transparent dark:bg-gray-700 dark:text-white transition duration-200"
                placeholder="Enter your last name"
                required
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="relative">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              value={formData.email}
              className="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-indigo-400 focus:border-transparent dark:bg-gray-700 dark:text-white transition duration-200"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Phone Number Field */}
          <div className="relative">
            <label
              htmlFor="phone_number"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Phone Number
            </label>
            <input
              type="text"
              name="phone_number"
              id="phone_number"
              onChange={handleChange}
              value={formData.phone_number}
              className="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-indigo-400 focus:border-transparent dark:bg-gray-700 dark:text-white transition duration-200"
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div className="flex space-x-3">
            {/* Password Field */}
            <div className="relative w-1/2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
                value={formData.password}
                className="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-indigo-400 focus:border-transparent dark:bg-gray-700 dark:text-white transition duration-200"
                placeholder="Create a password"
                required
              />
            </div>

            {/* Confirm Password Field */}
            <div className="relative w-1/2">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                onChange={handleChange}
                value={formData.confirmPassword}
                className="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-indigo-400 focus:border-transparent dark:bg-gray-700 dark:text-white transition duration-200"
                placeholder="Confirm your password"
                required
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex items-center justify-center px-4 py-2 font-medium text-white bg-blue-600 dark:bg-indigo-500 rounded-md hover:bg-blue-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:ring-blue-500 dark:focus:ring-indigo-400 transition duration-200"
              disabled={isLoading}
            >
              <Transition
                show={isLoading}
                as="span"
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                {isLoading && (
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
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
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                )}
              </Transition>
              {isLoading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
