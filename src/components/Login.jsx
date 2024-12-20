import { useState, useEffect, useContext } from "react";
import { Transition } from "@headlessui/react";
import axios from "axios";
import toast from "react-hot-toast";
import { UserContext } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

export default function Login() {
  let navigate = useNavigate()
  let { setUserLogin,userLogin } = useContext(UserContext);
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
        `${import.meta.env.VITE_BASE_URL}/accounts/api/login/`,
        {
          email: formData.email,
          password: formData.password,
        }
      );
      localStorage.setItem(
        "userTaken",
        response?.data?.data?.tokens?.access_token
      );
      const token = response?.data?.data?.tokens?.access_token;
      setUserLogin(token);
      

      toast.success("Logged in Successfully");
      setFormData({
        email: "",
        password: "",
      });
      navigate('/profile')
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
  // useEffect(() => {
  //   // Log userLogin whenever it changes
  //   if (userLogin) {
  //     console.log("userLogin updated:", userLogin);
  //   }
  // }, [userLogin]);
  console.log(userLogin);
  

  if (userLogin !== null) {
    return (
      <div className="p-4 max-w-md mx-auto bg-blue-50 border border-blue-200 rounded-lg shadow-md text-blue-900 dark:bg-blue-900 dark:border-blue-700 dark:text-blue-100">
        <p className="text-lg font-semibold">Welcome back!</p>
        <p className="mt-1">
          You are currently logged in. To access a different account, please log
          out first.
        </p>
      </div>
    );
  }


  return (
    <>
      <Helmet>
        <title>Aviato | Login</title>
      </Helmet>
      <motion.div
        className="flex items-center justify-center mb-16 dark:from-gray-800 px-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="w-full max-w-xl p-8 bg-white dark:bg-gray-800 rounded-lg mt-14 shadow-lg space-y-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center">
            Login To Your Account
          </h2>
          {error && (
            <motion.div
              className="text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300 border border-red-500 rounded p-2 text-sm text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {error}
            </motion.div>
          )}
          {successMessage && (
            <motion.div
              className="text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300 border border-green-500 rounded p-2 text-sm text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {successMessage}
            </motion.div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <motion.div
              className="relative"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
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
            </motion.div>
            <motion.div
              className="relative"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
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
            </motion.div>
            <motion.button
              type="submit"
              className={`w-full mt-4 py-2 bg-blue-600 text-white rounded-lg focus:outline-none hover:bg-blue-500 transition duration-200 flex items-center justify-center ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {isLoading ? (
                <>
                  Logging
                  <span className="ml-1.5 flex items-center gap-1">
                    <span className="animate-flashing w-1 h-1 bg-white rounded-full inline-block" />
                    <span className="animate-flashing delay-100 w-1 h-1 bg-white rounded-full inline-block" />
                    <span className="animate-flashing delay-200 w-1 h-1 bg-white rounded-full inline-block" />
                  </span>
                </>
              ) : (
                "Login"
              )}
            </motion.button>
            <motion.div
              className="relative "
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className="pl-4 dark:text-gray-200">
                didn't have account yet ?{" "}
                <span className="font-semibold ">
                  <Link
                    className="text-blue-600 hover:text-blue-700"
                    to={"/register"}
                  >
                    Register now
                  </Link>
                </span>{" "}
              </p>
              <p className="mt-1 ml-4 dark:text-gray-200">
                <span className="font-semibold ">
                  <Link
                    className="text-blue-600 hover:text-blue-700"
                    to={"/reset-password"}
                  >
                    Forgot Password
                  </Link>
                </span>{" "}
              </p>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </>
  );
}
