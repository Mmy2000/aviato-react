import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Spinner from "../ui/Spinner";
import { FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const Products = () => {
  const fetchProducts = () => {
    return axios.get("http://127.0.0.1:8000/products/api/products");
  };

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  console.log(data?.data?.results);

  if (isLoading) {
    return (
      <div className="flex items-center w-full justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-6 min-h-screen">
      {data?.data?.results?.map((product) => {
        const price = parseFloat(product.price);
        return (
          <motion.div
            key={product.id}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative">
              <motion.img
                src={product.image || "/placeholder-image.jpg"}
                alt={product.name}
                className="w-full h-56 object-contain"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
              <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white text-sm font-semibold px-3 py-1 rounded-lg shadow-lg">
                {isNaN(price) ? "N/A" : `$${price.toFixed(2)}`}
              </div>
            </div>
            <div className="p-5">
              <Link to={`/products/${product.id}`}>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 truncate">
                  {product.name}
                </h2>
              </Link>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">
                {product.description || "No description available."}
              </p>
              <div className="flex items-center mt-3">
                <div className="flex text-yellow-500 text-sm">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.25l2.94 6.23 6.85 1-4.94 4.82 1.17 6.85-6.02-3.16-6.02 3.16L7.15 14.3 2.21 9.48l6.85-1z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                  (123 reviews)
                </span>
              </div>
              <motion.button
                className="mt-5 w-full flex items-center justify-center bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 focus:outline-none transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaShoppingCart className="mr-2" />
                Add to Cart
              </motion.button>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
