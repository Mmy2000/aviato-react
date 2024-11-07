import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Spinner from "../ui/Spinner";
import { Link } from "react-router-dom";
import { textSlicer } from "../utils/functions";

const Brands = ({ onBrandSelect }) => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBrands = async () => {
        setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:8000/products/api/brands/"
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
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-5xl font-extrabold text-center text-gray-800 dark:text-gray-100 mb-16 tracking-tight">
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
                    {textSlicer(brand.description,100)}
                  </p>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Brands;
