import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Spinner from "../ui/Spinner";
import { Link } from "react-router-dom";
import Masonry from "react-masonry-css";
import { textSlicer } from "../utils/functions";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const defaultImage =
    "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg";

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/categories/api/categories"
        );
        setCategories(response?.data?.results);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  const breakpointColumns = {
    default: 2, // 3 columns on large screens
    1100: 2, // 2 columns on medium screens
    700: 1, // 1 column on small screens
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center text-gray-800 dark:text-gray-100 mb-12 tracking-tight">
        Explore Our Categories
      </h2>
      <Masonry
        breakpointCols={breakpointColumns}
        className="flex w-auto"
        columnClassName="masonry-grid_column"
      >
        {categories?.map((category) => (
          <motion.div
            key={category.id}
            className="p-4 sm:p-6 lg:p-8 border border-gray-100 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-shadow duration-300 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Link to={`/categories/${category.id}`}>
              <div className="flex flex-col sm:flex-row items-start sm:space-x-6">
                <motion.img
                  src={category.image || defaultImage}
                  alt={category.name}
                  className="w-full sm:w-24 h-48 sm:h-24 object-cover rounded-lg shadow-md border border-gray-200 dark:border-gray-600 mb-4 sm:mb-0"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />

                <div>
                  <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-gray-200 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-200 font-medium mb-4">
                    {textSlicer(category.description, 100)}
                  </p>
                </div>
              </div>
            </Link>
            <div className="mt-6 sm:ml-6">
              <h4 className="text-lg sm:text-2xl font-medium text-gray-700 dark:text-gray-300 mb-4">
                Subcategories:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {category.subcategories.map((subcategory) => (
                  <Link
                    to={`/categories/${category.id}/${subcategory.id}`}
                    key={subcategory.id}
                  >
                    <motion.div
                      className="flex flex-col items-center text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 transform hover:-translate-y-1"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                    >
                      <motion.img
                        src={subcategory.image || defaultImage}
                        alt={subcategory.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-full mb-3 shadow-lg border border-gray-200 dark:border-gray-600"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <h5 className="text-md sm:text-lg font-semibold text-gray-800 dark:text-gray-100">
                        {subcategory.name}
                      </h5>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {textSlicer(subcategory.description, 100)}
                      </p>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </Masonry>
    </div>
  );
};

export default Categories;
