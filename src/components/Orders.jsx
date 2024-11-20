import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Spinner from "../ui/Spinner";
import { Link, useNavigate } from "react-router-dom";


let headers = {
  Authorization: `Bearer ${localStorage.getItem("userTaken")}`,
};

const fetchOrders = async () => {
  const response = await fetch("http://127.0.0.1:8000/accounts/api/orders/", {
    headers
  });
  
  return response.json();
};

const Orders = () => {
    const navigate = useNavigate()
  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orders"], // Changed to use an object
    queryFn: fetchOrders,
  });
  

  const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-lg text-gray-600 dark:text-gray-300">
          <Spinner/>
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-lg text-red-500 dark:text-red-300">
          Failed to load orders.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col  mb-8">
          <h1 className="text-3xl text-center font-bold text-gray-800 dark:text-gray-100">
            Orders Page
          </h1>
          <div className="flex justify-between items-center">
            <button
              onClick={() => navigate(-1)} // Navigate back to the previous page
              className="flex items-center mb-4 px-4 py-2 bg-gray-900 text-white rounded-l-full shadow-md hover:bg-gray-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-gray-700 dark:hover:bg-gray-600"
              aria-label="Go back to the previous page" // Accessibility label
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Go Back
            </button>
            <span className="text-lg font-medium dark:text-gray-200">
              {orders?.length} Orders
            </span>
          </div>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.1 }}
          className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden"
        >
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide">
              <tr>
                <th className="px-6 py-4 text-left font-medium">
                  Order Number
                </th>
                <th className="px-6 py-4 text-left font-medium">Date</th>
                <th className="px-6 py-4 text-left font-medium">Customer</th>
                <th className="px-6 py-4 text-left font-medium">Total</th>
                <th className="px-6 py-4 text-left font-medium">Payment</th>
                <th className="px-6 py-4 text-left font-medium">Status</th>
                <th className="px-6 py-4 text-center font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <motion.tr
                  key={order.id}
                  variants={rowVariants}
                  transition={{ type: "spring", stiffness: 50 }}
                  className={`${
                    index % 2 === 0
                      ? "bg-white dark:bg-gray-800"
                      : "bg-gray-50 dark:bg-gray-700"
                  } hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors`}
                >
                  <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200 font-medium">
                    #{order.order_number}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {new Date(order.created_at).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {order.full_name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200 font-semibold">
                    ${order.order_total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {order.payment_details.payment_method}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                        order.status === "On Delivery"
                          ? "text-blue-800 bg-blue-100 dark:text-blue-200 dark:bg-blue-900"
                          : "text-green-700 bg-green-100 dark:text-slate-600 dark:bg-green-200"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Link to={`/orders/${order.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 dark:hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        View
                      </motion.button>
                    </Link>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
};

export default Orders;
