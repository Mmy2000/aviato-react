import React from "react";
import {
  FaHeadset,
  FaCreditCard,
  FaLock,
  FaTruck,
  FaCalendarAlt,
} from "react-icons/fa";

const Payment = () => {
  const benefits = [
    {
      icon: (
        <FaHeadset className="text-4xl text-indigo-600 dark:text-indigo-400" />
      ),
      title: "24/7 SUPPORT",
      description: "Support every time",
    },
    {
      icon: (
        <FaCreditCard className="text-4xl text-indigo-600 dark:text-indigo-400" />
      ),
      title: "ACCEPT PAYMENT",
      description: "Visa, Paypal, Master",
    },
    {
      icon: (
        <FaLock className="text-4xl text-indigo-600 dark:text-indigo-400" />
      ),
      title: "SECURED PAYMENT",
      description: "100% secured",
    },
    {
      icon: (
        <FaTruck className="text-4xl text-indigo-600 dark:text-indigo-400" />
      ),
      title: "FREE SHIPPING",
      description: "Order over $300",
    },
    {
      icon: (
        <FaCalendarAlt className="text-4xl text-indigo-600 dark:text-indigo-400" />
      ),
      title: "30 DAYS RETURN",
      description: "30 days guarantee",
    },
  ];

  return (
    <section className="bg-gradient-to-br  dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 py-20 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 items-center gap-y-8 lg:gap-x-4">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className={`flex flex-col items-center text-center space-y-2 px-4 
            ${index < benefits.length - 1 && "lg:border-r lg:border-gray-300 dark:lg:border-gray-600"}`}
          >
            {/* Icon */}
            {benefit.icon}
            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              {benefit.title}
            </h3>
            {/* Description */}
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Payment;
