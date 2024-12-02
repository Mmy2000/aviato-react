import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/newsletter/`,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      

      toast.success(response?.data?.message || "Subscribed successfully!");
      setEmail("");
    } catch (err) {
      toast.error(
        err.response?.data?.email?.[0] ||
          "An error occurred. Please try again."
      );
      console.log(err);
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Subscribe to our Newsletter
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Stay updated with our latest news and offers.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className={`w-full border ${
              error ? "border-red-500" : "border-gray-300"
            } bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400`}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:bg-gradient-to-l text-white font-semibold py-3 flex justify-center items-center rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 ${
            loading ? "opacity-75 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <>
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
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Subscribing...
            </>
          ) : (
            "Subscribe"
          )}
        </button>
      </form>
    </div>
  );
};

export default NewsletterForm;
