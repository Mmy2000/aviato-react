import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Spinner from "../ui/Spinner";
import { Link } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
        setLoading(true)
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/categories/api/categories"
        );
        setCategories(response?.data?.results);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
      finally{
        setLoading(false)
      }
    };

    fetchCategories();
  }, []);
  if (loading) {
    return<Spinner/>
  }
  console.log(categories);
  

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-5xl font-extrabold text-center text-gray-800 dark:text-gray-100 mb-16 tracking-tight">
        Explore Our Categories
      </h2>
      <div className="grid gap-12 lg:grid-cols-2">
        {categories?.map((category) => (
          <motion.div
            key={category.id}
            className="p-8 border border-gray-100 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-shadow duration-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="flex items-start space-x-6">
              {category.image && (
                <motion.img
                  src={category.image}
                  alt={category.name}
                  className="w-24 h-24 object-cover rounded-xl shadow-md border border-gray-200 dark:border-gray-600"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              )}
              <div>
                <h3 className="text-3xl font-semibold text-gray-900 dark:text-gray-200 mb-2">
                  <Link
                    to={`/categories/${category.id}`}
                  >
                    {category.name}
                  </Link>
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {category.description}
                </p>
              </div>
            </div>
            <div className="mt-8 ml-6">
              <h4 className="text-2xl font-medium text-gray-700 dark:text-gray-300 mb-4">
                Subcategories:
              </h4>
              <div className="grid grid-cols-2 gap-6">
                {category.subcategories.map((subcategory) => (
                  <motion.div
                    key={subcategory.id}
                    className="flex flex-col items-center text-center p-5 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 transform hover:-translate-y-1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    {subcategory.image && (
                      <motion.img
                        src={subcategory.image}
                        alt={subcategory.name}
                        className="w-16 h-16 object-cover rounded-full mb-3 shadow-lg border border-gray-200 dark:border-gray-600"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                        {subcategory.name}
                    </h5>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {subcategory.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
