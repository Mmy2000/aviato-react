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
import Modal from "../shared/Modal";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/solid";


export const Products = () => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [productCount, setProductCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // New state

  const openModal = (product) => {
    setSelectedProduct(product); // Set the clicked product
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  console.log(selectedProduct);
  

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
    <>
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
                      <Link
                        to={`/products/${product.id}/${product.category.id}`}
                      >
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
                        onClick={() => openModal(product)}
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
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Choose Variations"
      >
        {(selectedProduct?.color_variations?.length > 0 ||
          selectedProduct?.size_variations?.length > 0) && (
          <div className="flex space-x-20">
            {/* Color Selection */}
            {selectedProduct.color_variations?.length > 0 && (
              <div className="w-1/3">
                <span className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                  Color:
                </span>
                <Listbox value={selectedColor} onChange={setSelectedColor}>
                  <div className="relative mt-1">
                    <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200">
                      <span className="block truncate">
                        {selectedColor?.variation_value || "Select a color"}
                      </span>
                      <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <ChevronDownIcon
                          className="w-5 h-5 text-gray-400 dark:text-gray-500"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Listbox.Options className="absolute w-full py-1 mt-1 bg-white dark:bg-gray-800 rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none">
                      {selectedProduct.color_variations.map((variation) => (
                        <Listbox.Option
                          key={variation.id}
                          value={variation}
                          className={({ active }) =>
                            `cursor-pointer select-none relative py-2 pl-10 pr-4 ${
                              active
                                ? "bg-gradient-to-r from-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400"
                                : "text-gray-700 dark:text-gray-200"
                            } transition duration-200 ease-in-out rounded-md`
                          }
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {variation.variation_value}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600 dark:text-blue-400">
                                  <CheckIcon
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                </Listbox>
              </div>
            )}

            {/* Size Selection */}
            {selectedProduct.size_variations?.length > 0 && (
              <div className="w-1/3">
                <span className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                  Size:
                </span>
                <Listbox value={selectedSize} onChange={setSelectedSize}>
                  <div className="relative mt-1">
                    <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200">
                      <span className="block truncate">
                        {selectedSize?.variation_value || "Select a size"}
                      </span>
                      <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <ChevronDownIcon
                          className="w-5 h-5 text-gray-400 dark:text-gray-500"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Listbox.Options className="absolute w-full py-1 mt-1 bg-white dark:bg-gray-800 rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none">
                      {selectedProduct.size_variations.map((size) => (
                        <Listbox.Option
                          key={size.id}
                          value={size}
                          className={({ active }) =>
                            `cursor-pointer select-none relative py-2 pl-10 pr-4 ${
                              active
                                ? "bg-gradient-to-r from-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400"
                                : "text-gray-700 dark:text-gray-200"
                            } transition duration-200 ease-in-out rounded-md`
                          }
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {size.variation_value}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600 dark:text-blue-400">
                                  <CheckIcon
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                </Listbox>
              </div>
            )}
          </div>
        )}
      </Modal>
    </>
  );
};
