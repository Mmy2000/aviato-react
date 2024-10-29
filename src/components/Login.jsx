// RegisterPage.jsx
import { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Validate in real-time
    validateField(name, value);
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateField = (name, value) => {
    let errors = { ...formErrors };
    switch (name) {
      case "email":
        if (!validateEmail(value)) {
          errors[name] = "Invalid email format!";
        } else {
          delete errors[name];
        }
        break;
      case "password":
        if (value.length < 6) {
          errors[name] = "Password must be at least 6 characters long!";
        } else {
          delete errors[name];
        }
        break;
      default:
        break;
    }
    setFormErrors(errors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    // Final validation check before submission
    if (Object.keys(formErrors).length > 0) {
      toast.info("Please fix the errors in the form!");
      setError("Please fix the errors in the form!");
      return;
    }

    // API request to backend
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/accounts/api/login/",
        {
          email: formData.email,
          password: formData.password,
        }
      );
      console.log(response.data.data.tokens.access_token);
      

      toast.success("Logged in Successfully");
      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Login failed. Please check the details provided."
      );
      setError(
        error.response?.data?.message ||
          "Login failed. Please check the details provided."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" flex items-center justify-center dark:from-gray-800 px-4">
      <div className="w-full max-w-xl p-8 bg-white dark:bg-gray-800 rounded-lg mt-14 shadow-lg space-y-8">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center">
          Login To Your Account
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
              className={`w-full mt-1 px-3 py-2 border ${formErrors.email ? "border-red-500" : "border-gray-300"} dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-indigo-400 focus:border-transparent dark:bg-gray-700 dark:text-white transition duration-200`}
              placeholder="Enter your email"
              required
            />
            {formErrors.email && (
              <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
            )}
          </div>
            {/* Password Field */}
            <div className="relative">
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
                className={`w-full mt-1 px-3 py-2 border ${formErrors.password ? "border-red-500" : "border-gray-300"} dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-indigo-400 focus:border-transparent dark:bg-gray-700 dark:text-white transition duration-200`}
                placeholder="Enter your password"
                required
              />
              {formErrors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {formErrors.password}
                </p>
              )}
            </div>

          <button
            type="submit"
            className={`w-full mt-4 py-2 bg-blue-600 text-white rounded-lg focus:outline-none hover:bg-blue-500 transition duration-200 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? "Login..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
