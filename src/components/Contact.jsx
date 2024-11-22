import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/;

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim() || !emailRegex.test(formData.email))
      newErrors.email = "A valid email is required.";
    if (formData.phone_number && !phoneRegex.test(formData.phone_number))
      newErrors.phone_number = "Phone number must be 10-15 digits.";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required.";
    if (!formData.message.trim())
      newErrors.message = "Message cannot be empty.";

    return newErrors;
  };

  useEffect(() => {
    setErrors(validateForm());
  }, [formData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBlur = (e) => {
    setTouched({
      ...touched,
      [e.target.name]: true,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentErrors = validateForm();

    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      setTouched({
        name: true,
        email: true,
        phone_number: true,
        subject: true,
        message: true,
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/contact/`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(response?.data?.message || "Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        phone_number: "",
        subject: "",
        message: "",
      });
      setTouched({});
    } catch (error) {
      toast.error(
        error.response?.data?.non_field_errors?.[0] || "An error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="py-12 px-6"
    >
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-900 shadow-2xl rounded-xl p-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-6"
        >
          Get in Touch
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-lg text-center text-gray-600 dark:text-gray-300 mb-8"
        >
          We’d love to hear from you! Please fill out the form below and we’ll
          respond as soon as possible.
        </motion.p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { name: "name", type: "text", placeholder: "Your Full Name" },
            { name: "email", type: "email", placeholder: "Your Email Address" },
            {
              name: "phone_number",
              type: "text",
              placeholder: "Phone Number (Optional)",
            },
            { name: "subject", type: "text", placeholder: "Subject" },
          ].map((input) => (
            <div key={input.name}>
              <label
                htmlFor={input.name}
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                {input.placeholder}
              </label>
              <input
                type={input.type}
                name={input.name}
                id={input.name}
                placeholder={input.placeholder}
                value={formData[input.name]}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full border ${
                  touched[input.name] && errors[input.name]
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-700"
                } bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400`}
              />
              {touched[input.name] && errors[input.name] && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors[input.name]}
                </motion.p>
              )}
            </div>
          ))}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Your Message
            </label>
            <textarea
              name="message"
              id="message"
              placeholder="Write your message here..."
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full border ${
                touched.message && errors.message
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-700"
              } bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 h-40 resize-none`}
            ></textarea>
            {touched.message && errors.message && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-red-500 text-sm mt-1"
              >
                {errors.message}
              </motion.p>
            )}
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center items-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl hover:bg-gradient-to-l transform transition-all duration-300 ${
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
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </div>
        </form>
      </div>
    </motion.section>
  );
};

export default Contact;
