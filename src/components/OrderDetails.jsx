import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Spinner from "../ui/Spinner";

let headers = {
  Authorization: `Bearer ${localStorage.getItem("userTaken")}`,
};

const fetchOrderDetail = async (id) => {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/accounts/api/orders/${id}/`,
    {
      headers,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch order details");
  }

  return response.json();
};

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: order,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orderDetail", id],
    queryFn: () => fetchOrderDetail(id),
  });

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
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900">
        <p className="text-lg text-red-500 dark:text-red-300 mb-6">
          Failed to load order details.
        </p>
        <button
          className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-10">
      {/* Header */}
      <div className="flex gap-96 items-center">
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
        <div className="text-center mb-10">
          <h1 className="text-4xl  font-bold text-gray-800 dark:text-white">
            AVIATO
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
            Your Order Details
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="w-full max-w-5xl bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-200 dark:divide-gray-700">
          {/* Order Summary */}
          <div className="p-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
              Order Summary
            </h2>
            <ul className="space-y-4 text-gray-600 dark:text-gray-300">
              <li>
                <strong className="font-bold">Order Number:</strong>{" "}
                {order.order_number}
              </li>
              <li>
                <strong className="font-bold">Total Amount:</strong> $
                {order.order_total.toFixed(2)}
              </li>
              <li>
                <strong className="font-bold">Tax:</strong> $
                {order.tax.toFixed(2)}
              </li>
              <li>
                <strong className="font-bold">Payment Method:</strong>{" "}
                {order?.payment_details?.payment_method}
              </li>
              <li>
                <strong className="font-bold">Shipping Address:</strong>{" "}
                {order.full_address}
              </li>
            </ul>
          </div>

          {/* Products Section */}
          <div className="p-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
              Products in Your Order
            </h2>
            <div className="space-y-6">
              {order.order_products.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-md"
                >
                  <img
                    src={`${import.meta.env.VITE_BASE_URL}${product.product.image}`}
                    alt={product.product.name}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <div className="ml-4">
                    <h3 className="text-gray-800 dark:text-white font-semibold">
                      {product.product.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Price: ${parseFloat(product.product.price).toFixed(2)} x{" "}
                      {product.quantity}
                    </p>
                    <p className="text-sm text-gray-800 dark:text-white font-medium mt-1">
                      Total: $
                      {parseFloat(
                        product.product_price * product.quantity
                      ).toFixed(2)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className=" text-white text-center py-6">
          <button
            className="w-full mx-6 px-6 py-3 bg-gray-900 font-semibold rounded-lg shadow-md hover:bg-gray-600 transition"
            onClick={() => navigate("/products")}
          >
            Continue Shopping
          </button>
        </div>
      </div>

      <div className="text-center mt-6 text-gray-600 dark:text-gray-400">
        If you have any questions about your order, please{" "}
        <Link to={"/contact"} className="text-blue-500 hover:underline">
          contact our support team
        </Link>
        .
      </div>
    </div>
  );
};

export default OrderDetail;
