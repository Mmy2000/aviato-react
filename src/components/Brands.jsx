import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Spinner from "../ui/Spinner";
import { Link, useNavigate } from "react-router-dom";
import { textSlicer } from "../utils/functions";
import { Helmet } from "react-helmet";

const Brands = ({ onBrandSelect }) => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBrands = async () => {
        setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/products/api/brands/`
        );
        setBrands(response?.data?.results);
      } catch (error) {
        console.error("Error fetching brands:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Helmet>
        <title>Aviato | Brands</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex items-center mb-4 lg:mb-2 text-sm ">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center mr-2 px-4 py-2 bg-gray-900 text-white rounded-l-full shadow-md hover:bg-gray-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-gray-700 dark:hover:bg-gray-600"
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
          <Link
            to={"/"}
            className="text-gray-500 dark:text-gray-100 font-medium hover:underline transition-colors"
          >
            Home
          </Link>
          <span className="mx-3 text-gray-400">›</span>
          <span className="text-gray-700 dark:text-gray-300 font-semibold">
            Brands
          </span>
        </nav>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center text-gray-800 dark:text-gray-100 mb-16 tracking-tight">
          Explore Our Brands
        </h2>
        <div className="grid gap-12 lg:grid-cols-2">
          {brands?.map((brand) => (
            <Link to={`/brands/${brand.id}`}>
              <motion.div
                key={brand.id}
                className="p-8 border border-gray-100 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                onClick={() => onBrandSelect(brand.id)}
              >
                <div className="flex items-start space-x-6">
                  {brand.logo && (
                    <motion.img
                      src={brand.logo}
                      alt={brand.name}
                      className="w-24 h-24 object-cover rounded-xl shadow-md border border-gray-200 dark:border-gray-600"
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                  )}
                  <div>
                    <h3 className="text-3xl font-semibold text-gray-900 dark:text-gray-200 mb-2">
                      {brand.name}
                    </h3>
                    <p className="text-gray-600 font-medium dark:text-gray-200 mb-4">
                      {textSlicer(brand.description, 100)}
                    </p>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Brands;
