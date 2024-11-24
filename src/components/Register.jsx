// RegisterPage.jsx
import { useState, useEffect, useContext } from "react";
import { Transition } from "@headlessui/react";
import axios from "axios";
import toast from "react-hot-toast";
import { UserContext } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";


export default function Register() {
  const formVariants = {
    hidden: { opacity: 0, y: 20 }, // Start with opacity 0 and slightly below
    visible: { opacity: 1, y: 0 }, // Animate to full opacity and original position
    exit: { opacity: 0, y: -20 }, // Exit with fade out and slight upward motion
  };
  let navigate = useNavigate();
  let { setUserLogin, userLogin } = useContext(UserContext);
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
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    e.preventDefault()
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
      case "first_name":
      case "last_name":
        if (value.trim() === "") {
          errors[name] = `${name.replace("_", " ")} is required!`;
        } else {
          delete errors[name];
        }
        break;
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
      case "confirmPassword":
        if (value !== formData.password) {
          errors[name] = "Passwords do not match!";
        } else {
          delete errors[name];
        }
        break;
      case "phone_number":
        if (value.trim() === "") {
          errors[name] = "Phone number is required!";
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
        `${import.meta.env.VITE_BASE_URL}/accounts/api/register/`,
        {
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          password: formData.password,
          confirm_password: formData.confirmPassword,
          phone_number: formData.phone_number,
        }
      );
      localStorage.setItem("userTaken", response?.data?.data?.tokens?.access_token);
      setUserLogin(response.data.data.tokens.access_token);
      console.log(userLogin);
      
      toast.success("Registered Successfully");
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone_number: "",
      });
      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration failed. Please check the details provided."
      );
      setError(
        error.response?.data?.message ||
          "Registration failed. Please check the details provided."
      );
    } finally {
      setIsLoading(false);
    }
  };
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
    // <div className=" flex items-center justify-center dark:from-gray-800 ">
    //   <div className="w-full max-w-xl p-8 bg-white dark:bg-gray-800 rounded-lg mt-14 shadow-lg space-y-8">
    //     <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center">
    //       Create Your Account
    //     </h2>
    //     {error && (
    //       <div className="text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300 border border-red-500 rounded p-2 text-sm text-center">
    //         {error}
    //       </div>
    //     )}
    //     {successMessage && (
    //       <div className="text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300 border border-green-500 rounded p-2 text-sm text-center">
    //         {successMessage}
    //       </div>
    //     )}
    //     <form className="space-y-6" onSubmit={handleSubmit}>
    //       <div className="flex space-x-3">
    //         {/* First Name Field */}
    //         <div className="relative w-1/2">
    //           <label
    //             htmlFor="first_name"
    //             className="block text-sm font-medium text-gray-700 dark:text-gray-300"
    //           >
    //             First Name
    //           </label>
    //           <input
    //             type="text"
    //             name="first_name"
    //             id="first_name"
    //             onChange={handleChange}
    //             value={formData.first_name}
    //             className={`w-full mt-1 px-3 py-2 border ${formErrors.first_name ? "border-red-500" : "border-gray-300"} dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-indigo-400 focus:border-transparent dark:bg-gray-700 dark:text-white transition duration-200`}
    //             placeholder="Enter your first name"
    //             required
    //           />
    //           {formErrors.first_name && (
    //             <p className="text-red-500 text-xs mt-1">
    //               {formErrors.first_name}
    //             </p>
    //           )}
    //         </div>

    //         {/* Last Name Field */}
    //         <div className="relative w-1/2">
    //           <label
    //             htmlFor="last_name"
    //             className="block text-sm font-medium text-gray-700 dark:text-gray-300"
    //           >
    //             Last Name
    //           </label>
    //           <input
    //             type="text"
    //             name="last_name"
    //             id="last_name"
    //             onChange={handleChange}
    //             value={formData.last_name}
    //             className={`w-full mt-1 px-3 py-2 border ${formErrors.last_name ? "border-red-500" : "border-gray-300"} dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-indigo-400 focus:border-transparent dark:bg-gray-700 dark:text-white transition duration-200`}
    //             placeholder="Enter your last name"
    //             required
    //           />
    //           {formErrors.last_name && (
    //             <p className="text-red-500 text-xs mt-1">
    //               {formErrors.last_name}
    //             </p>
    //           )}
    //         </div>
    //       </div>

    //       {/* Email Field */}
    //       <div className="relative">
    //         <label
    //           htmlFor="email"
    //           className="block text-sm font-medium text-gray-700 dark:text-gray-300"
    //         >
    //           Email
    //         </label>
    //         <input
    //           type="email"
    //           name="email"
    //           id="email"
    //           onChange={handleChange}
    //           value={formData.email}
    //           className={`w-full mt-1 px-3 py-2 border ${formErrors.email ? "border-red-500" : "border-gray-300"} dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-indigo-400 focus:border-transparent dark:bg-gray-700 dark:text-white transition duration-200`}
    //           placeholder="Enter your email"
    //           required
    //         />
    //         {formErrors.email && (
    //           <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
    //         )}
    //       </div>

    //       {/* Phone Number Field */}
    //       <div className="relative">
    //         <label
    //           htmlFor="phone_number"
    //           className="block text-sm font-medium text-gray-700 dark:text-gray-300"
    //         >
    //           Phone Number
    //         </label>
    //         <input
    //           type="text"
    //           name="phone_number"
    //           id="phone_number"
    //           onChange={handleChange}
    //           value={formData.phone_number}
    //           className={`w-full mt-1 px-3 py-2 border ${formErrors.phone_number ? "border-red-500" : "border-gray-300"} dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-indigo-400 focus:border-transparent dark:bg-gray-700 dark:text-white transition duration-200`}
    //           placeholder="Enter your phone number"
    //           required
    //         />
    //         {formErrors.phone_number && (
    //           <p className="text-red-500 text-xs mt-1">
    //             {formErrors.phone_number}
    //           </p>
    //         )}
    //       </div>

    //       <div className="flex space-x-3">
    //         {/* Password Field */}
    //         <div className="relative w-1/2">
    //           <label
    //             htmlFor="password"
    //             className="block text-sm font-medium text-gray-700 dark:text-gray-300"
    //           >
    //             Password
    //           </label>
    //           <input
    //             type="password"
    //             name="password"
    //             id="password"
    //             onChange={handleChange}
    //             value={formData.password}
    //             className={`w-full mt-1 px-3 py-2 border ${formErrors.password ? "border-red-500" : "border-gray-300"} dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-indigo-400 focus:border-transparent dark:bg-gray-700 dark:text-white transition duration-200`}
    //             placeholder="Enter your password"
    //             required
    //           />
    //           {formErrors.password && (
    //             <p className="text-red-500 text-xs mt-1">
    //               {formErrors.password}
    //             </p>
    //           )}
    //         </div>

    //         {/* Confirm Password Field */}
    //         <div className="relative w-1/2">
    //           <label
    //             htmlFor="confirmPassword"
    //             className="block text-sm font-medium text-gray-700 dark:text-gray-300"
    //           >
    //             Confirm Password
    //           </label>
    //           <input
    //             type="password"
    //             name="confirmPassword"
    //             id="confirmPassword"
    //             onChange={handleChange}
    //             value={formData.confirmPassword}
    //             className={`w-full mt-1 px-3 py-2 border ${formErrors.confirmPassword ? "border-red-500" : "border-gray-300"} dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-indigo-400 focus:border-transparent dark:bg-gray-700 dark:text-white transition duration-200`}
    //             placeholder="Confirm your password"
    //             required
    //           />
    //           {formErrors.confirmPassword && (
    //             <p className="text-red-500 text-xs mt-1">
    //               {formErrors.confirmPassword}
    //             </p>
    //           )}
    //         </div>
    //       </div>

    //       <button
    //         type="submit"
    //         className={`w-full mt-4 py-2 bg-blue-600 text-white rounded-lg focus:outline-none hover:bg-blue-500 transition duration-200 flex items-center justify-center ${
    //           isLoading ? "opacity-50 cursor-not-allowed" : ""
    //         }`}
    //         disabled={isLoading}
    //       >
    //         {isLoading ? (
    //           <>
    //             <svg
    //               className="animate-spin h-5 w-5 mr-2 text-white"
    //               xmlns="http://www.w3.org/2000/svg"
    //               fill="none"
    //               viewBox="0 0 24 24"
    //             >
    //               <circle
    //                 className="opacity-25"
    //                 cx="12"
    //                 cy="12"
    //                 r="10"
    //                 stroke="currentColor"
    //                 strokeWidth="4"
    //               ></circle>
    //               <path
    //                 className="opacity-75"
    //                 fill="currentColor"
    //                 d="M4 12a8 8 0 018-8v8H4z"
    //               ></path>
    //             </svg>
    //             Registering...
    //           </>
    //         ) : (
    //           "Register"
    //         )}
    //       </button>
    //     </form>
    //   </div>
    // </div>
    <div className="flex items-center justify-center dark:from-gray-800 mb-16">
      <motion.div
        className="w-full max-w-xl p-8 bg-white dark:bg-gray-800 rounded-lg mt-14 shadow-lg space-y-8"
        variants={formVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.5 }}
      >
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

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* First Name and Last Name Fields */}
          <div className="flex flex-col sm:flex-row sm:space-x-4">
            <div className="relative sm:w-1/2">
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
                className={`w-full mt-1 px-3 py-2 border ${
                  formErrors.first_name ? "border-red-500" : "border-gray-300"
                } dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-indigo-400 focus:border-transparent dark:bg-gray-700 dark:text-white transition duration-200`}
                placeholder="Enter your first name"
                required
              />
              {formErrors.first_name && (
                <p className="text-red-500 text-xs mt-1">
                  {formErrors.first_name}
                </p>
              )}
            </div>

            <div className="relative sm:w-1/2 mt-4 sm:mt-0">
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
                className={`w-full mt-1 px-3 py-2 border ${
                  formErrors.last_name ? "border-red-500" : "border-gray-300"
                } dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-indigo-400 focus:border-transparent dark:bg-gray-700 dark:text-white transition duration-200`}
                placeholder="Enter your last name"
                required
              />
              {formErrors.last_name && (
                <p className="text-red-500 text-xs mt-1">
                  {formErrors.last_name}
                </p>
              )}
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
              className={`w-full mt-1 px-3 py-2 border ${
                formErrors.email ? "border-red-500" : "border-gray-300"
              } dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-indigo-400 focus:border-transparent dark:bg-gray-700 dark:text-white transition duration-200`}
              placeholder="Enter your email"
              required
            />
            {formErrors.email && (
              <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
            )}
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
              className={`w-full mt-1 px-3 py-2 border ${
                formErrors.phone_number ? "border-red-500" : "border-gray-300"
              } dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-indigo-400 focus:border-transparent dark:bg-gray-700 dark:text-white transition duration-200`}
              placeholder="Enter your phone number"
              required
            />
            {formErrors.phone_number && (
              <p className="text-red-500 text-xs mt-1">
                {formErrors.phone_number}
              </p>
            )}
          </div>

          {/* Password and Confirm Password Fields */}
          <div className="flex flex-col sm:flex-row sm:space-x-4">
            <div className="relative sm:w-1/2">
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
                className={`w-full mt-1 px-3 py-2 border ${
                  formErrors.password ? "border-red-500" : "border-gray-300"
                } dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-indigo-400 focus:border-transparent dark:bg-gray-700 dark:text-white transition duration-200`}
                placeholder="Enter your password"
                required
              />
              {formErrors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {formErrors.password}
                </p>
              )}
            </div>

            <div className="relative sm:w-1/2 mt-4 sm:mt-0">
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
                className={`w-full mt-1 px-3 py-2 border ${
                  formErrors.confirmPassword
                    ? "border-red-500"
                    : "border-gray-300"
                } dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-indigo-400 focus:border-transparent dark:bg-gray-700 dark:text-white transition duration-200`}
                placeholder="Confirm your password"
                required
              />
              {formErrors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {formErrors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full mt-4 py-2 bg-blue-600 text-white rounded-lg focus:outline-none hover:bg-blue-500 transition duration-200 flex items-center justify-center ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
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
                Registering...
              </>
            ) : (
              "Register"
            )}
          </button>
          <p className="pl-4 dark:text-gray-200">
            have an account ?{" "}
            <span className="font-semibold ">
              <Link
                className="text-blue-600  hover:text-blue-700"
                to={"/login"}
              >
                Login now
              </Link>
            </span>{" "}
          </p>
        </form>
      </motion.div>
    </div>
  );
}
