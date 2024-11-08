import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import Spinner from "../ui/Spinner";
import { FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Heading from "../ui/Heading";
import CategoriesAccordion from "../ui/CategoriesAccordion";
import FiltersPrice from "../ui/FiltersPrice";
import LatestProducts from "../ui/LatestProducts";

export const Products = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [productCount, setProductCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchProducts = async () => {
    const url = new URL("http://127.0.0.1:8000/products/api/products");
    if (selectedCategoryId) {
      url.searchParams.append(selectedType, selectedCategoryId);
    }
    if (minPrice !== null) {
      url.searchParams.append("min_price", minPrice);
    }
    if (maxPrice !== null) {
      url.searchParams.append("max_price", maxPrice);
    }
    if (searchTerm) {
      url.searchParams.append("search", searchTerm);
    }
    const response = await axios.get(url.toString());
    setProductCount(response?.data?.count);
    return response;
  };

  const { isLoading, isError, error, data } = useQuery({
    queryKey: [
      "products",
      selectedCategoryId,
      selectedType,
      minPrice,
      maxPrice,
      searchTerm, // Include search term in query key
    ],
    queryFn: fetchProducts,
  });

  const handleCategorySelect = (id, type) => {
    setSelectedCategoryId(id);
    setSelectedType(type);
  };

  // Reset filter function
  const resetFilters = () => {
    setSelectedCategoryId(null);
    setSelectedType(null);
    setMinPrice(0);
    setMaxPrice(10000);
    setSearchTerm("");
  };

  // if (isLoading) {
  //   return (
  //     <div className="flex items-center w-full justify-center">
  //       <Spinner />
  //     </div>
  //   );
  // }

  if (isError) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }

  const products = data?.data?.results;  
  const productCounts = products ? products.length : 0;
  

  return (
    <div className="flex flex-col lg:flex-row ">
      <div className="lg:w-1/4 p-6 rounded-lg mt-6 h-fit dark:bg-gray-900 shadow-lg ">
        <div className="flex flex-col w-full relative">
          <Heading name="Browse Categories" />
          <div className="flex my-4">
            <CategoriesAccordion
              className="w-full"
              onCategorySelect={handleCategorySelect}
            />
          </div>
          <div className="flex flex-col w-full relative">
            <Heading name="Filter by Price" />
            <div className="flex my-4">
              <FiltersPrice
                minPrice={minPrice}
                maxPrice={maxPrice}
                loading={isLoading}
                setMinPrice={setMinPrice}
                setMaxPrice={setMaxPrice}
              />
            </div>
          </div>
          {/* Conditionally render Reset Filter button */}
          {(selectedCategoryId !== null ||
            minPrice !== 0 ||
            maxPrice !== 10000) && (
            <button
              onClick={resetFilters}
              className="mt-4 px-4 bg-gray-600 text-white py-2 rounded-full hover:bg-slate-700 focus:outline-none transition-all duration-200"
            >
              Reset Filter
            </button>
          )}
          <div className="flex flex-col mt-6 w-full relative">
            <Heading name="latest products" />
            <div className="flex-flex-col my-4">
              <LatestProducts />
            </div>
          </div>
        </div>
      </div>
      <div className="lg:w-3/4 space-y-4 p-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-900 dark:text-gray-200 font-semibold">
            Showing {productCounts} of {productCount} results
          </span>
          <div className="relative w-3/4">
            <input
              type="text"
              placeholder="Search by name, description, category, subcategory, brand ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input
              className="w-full pl-12 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 transition duration-150 ease-in-out"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21 21l-4.35-4.35a8 8 0 1 0-1.41 1.41L21 21zm-10-16a6 6 0 1 1-6 6 6 6 0 0 1 6-6z" />
            </svg>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center w-full justify-center">
            <Spinner />
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {products.map((product) => {
              const price = parseFloat(product.price);
              return (
                <motion.div
                  key={product.id}
                  className="bg-white max-h-fit dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden"
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
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-gray-600 to-gray-400 text-white text-sm font-semibold px-3 py-1 rounded-lg shadow-lg">
                      {isNaN(price) ? "N/A" : `$${price.toFixed(2)}`}
                    </div>
                  </div>
                  <div className="p-5">
                    <Link to={`/products/${product.id}/${product.category.id}`}>
                      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 truncate">
                        {product.name}
                      </h2>
                    </Link>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">
                      {product.description || "No description available."}
                    </p>
                    <div className="flex items-center mt-3">
                      <Rating
                        value={product.avr_review}
                        readOnly
                        precision={0.5}
                        sx={{ color: "slategray" }}
                      />
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                        ({product.count_review} reviews)
                      </span>
                    </div>
                    <motion.button
                      className="mt-5 w-full flex items-center justify-center bg-gray-600 text-white py-2 rounded-full hover:bg-slate-700 focus:outline-none transition-all duration-200"
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
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-gray-200 text-lg space-y-4">
            <p className="text-2xl font-semibold">No Results Found</p>
            <p className="text-gray-600 dark:text-gray-200 text-center">
              We couldn't find any items matching your search. Please try
              adjusting your filters or exploring other categories.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
