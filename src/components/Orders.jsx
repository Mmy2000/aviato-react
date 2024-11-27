import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Spinner from "../ui/Spinner";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

let headers = {
  Authorization: `Bearer ${localStorage.getItem("userTaken")}`,
};

const fetchOrders = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/accounts/api/orders/`,
    {
      headers,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }

  return response.json();
};

const Orders = () => {
  const navigate = useNavigate();
  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orders"],
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
          <Spinner />
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

  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-gray-600 dark:text-gray-300"
        >
          <h2 className="text-2xl font-bold mb-4 dark:text-gray-100">
            No Orders Found
          </h2>
          <p className="text-lg mb-6">
            You haven't placed any orders yet. Browse our products and place
            your first order today!
          </p>
          <Link to="/products">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-slate-600 text-white rounded-lg shadow-md hover:bg-slate-500 dark:bg-slate-500 dark:hover:bg-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
            >
              Go to Shop
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Aviato | Orders</title>
      </Helmet>
      <div className="min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col mb-8">
            <h1 className="text-3xl text-center font-bold text-gray-800 dark:text-gray-100">
              Orders Page
            </h1>
            <div className="flex justify-between items-center">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center mb-4 px-4 py-2 bg-gray-900 text-white rounded-l-full shadow-md hover:bg-gray-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                aria-label="Go back to the previous page"
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
                {orders.length} Orders
              </span>
            </div>
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.1 }}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-x-scroll lg:overflow-hidden"
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
                      {order?.payment_details?.payment_method}
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
                          className="px-4 py-2 text-sm text-white bg-slate-600 rounded-md shadow-md hover:bg-slate-700 dark:hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500"
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
    </>
  );
};

export default Orders;
