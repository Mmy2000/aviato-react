import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '../ui/Spinner';
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
import Slider from "react-slick";

export const ProductDetails = () => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const navigate = useNavigate();
  let { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProductDetails = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://127.0.0.1:8000/products/api/product/${id}`
      );
      setProductDetails(data);
      
    } catch (error) {
      setError("Failed to fetch product details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProductDetails(id);
    
  }, [id]);
  const handleQuantityChange = (amount) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };
  if (loading) {
    return (
      <div className="flex items-center w-full justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center w-full justify-center">
        {error}
      </div>
    );
  }
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  console.log(productDetails);
  
      
  return (
    <>
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
      <div className="flex flex-col justify-between md:flex-row p-8 gap-8">
        <div className="w-full md:w-1/3">
          <Slider {...settings}>
            {/* Display the main image first */}
            {productDetails?.image && (
              <div key="main-image">
                <img
                  className="w-full max-h-96 object-contain"
                  src={productDetails.image}
                  alt={`${productDetails.name} - Main Image`}
                />
              </div>
            )}

            {/* Loop through additional images */}
            {productDetails?.images?.map((image, index) => (
              <div key={`image-${index}`}>
                <img
                  className="w-full max-h-96 object-contain"
                  src={image.image}
                  alt={`${productDetails.name} - Image ${index + 1}`}
                />
              </div>
            ))}
          </Slider>
        </div>

        <div className="w-full md:w-1/2 flex flex-col space-y-6">
          <h1 className="text-2xl font-bold dark:text-white">
            {productDetails?.name}
          </h1>
          <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">
            ${productDetails?.price}
          </p>
          <div className="flex items-center text-yellow-400 text-lg">
            <span className="text-black dark:text-white mr-2">
              {productDetails?.avr_review}
            </span>
            {"★".repeat(productDetails?.avr_review)}
            {"☆".repeat(5 - productDetails?.avr_review)}
            <span className="ml-2 text-gray-600 dark:text-gray-400">
              ({productDetails?.count_review} Reviews)
            </span>
          </div>
          <p className="text-gray-700 dark:text-gray-300">
            {productDetails?.description}
          </p>
          {(productDetails?.color_variations?.length > 0 ||
            productDetails?.size_variations?.length > 0) && (
            <div className="flex space-x-20">
              {/* Color Selection */}
              {productDetails.color_variations?.length > 0 && (
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
                        {productDetails.color_variations.map((variation) => (
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
              {productDetails.size_variations?.length > 0 && (
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
                        {productDetails.size_variations.map((size) => (
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

          <div className="flex items-center space-x-2">
            <span className="font-medium dark:text-white">Quantity:</span>
            <button
              onClick={() => handleQuantityChange(-1)}
              className="px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              -
            </button>
            <span className="dark:text-white">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(1)}
              className="px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              +
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-medium dark:text-white">Category:</span>
            <span className="bg-gray-200 px-2 py-1 rounded text-sm dark:bg-gray-700 dark:text-gray-200">
              {productDetails?.category?.category?.name} /{" "}
              {productDetails?.category?.name}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-medium dark:text-white">Brand:</span>
            <span className="bg-gray-200 px-2 py-1 rounded text-sm dark:bg-gray-700 dark:text-gray-200">
              {productDetails?.PRDBrand?.name}
            </span>
          </div>
          <button className="mt-4 py-2 px-4 bg-black text-white rounded hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600">
            ADD TO CART
          </button>
        </div>
      </div>
      <div>
        <TabGroup className="mt-5">
          {/* Tab List with enhanced styling */}
          <TabList className="flex space-x-2 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 p-1 dark:from-gray-700 dark:to-gray-800 shadow-lg">
            <Tab
              className={({ selected }) =>
                `w-full py-2.5 text-sm font-semibold rounded-full transition-all duration-300 ease-in-out transform
          ${
            selected
              ? "bg-white text-blue-600  dark:bg-gray-900 dark:text-blue-400"
              : "text-gray-600 dark:text-gray-300 hover:bg-blue-50/[0.5] dark:hover:bg-gray-600 "
          }`
              }
            >
              Description
            </Tab>
            <Tab
              className={({ selected }) =>
                `w-full py-2.5 text-sm font-semibold rounded-full transition-all duration-300 ease-in-out transform
          ${
            selected
              ? "bg-white text-blue-600  dark:bg-gray-900 dark:text-blue-400"
              : "text-gray-600 dark:text-gray-300 hover:bg-blue-50/[0.5] dark:hover:bg-gray-600 "
          }`
              }
            >
              Reviews ({productDetails?.count_review} reviews)
            </Tab>
          </TabList>

          {/* Tab Panels with enhanced styling */}
          <TabPanels>
            <TabPanel className="p-6 mt-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-2xl transition-colors duration-500 ease-in-out dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900">
              <p className="text-gray-800 dark:text-gray-200 font-medium">
                {productDetails?.description}
              </p>
            </TabPanel>
            <TabPanel className="p-6 mt-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-2xl transition-colors duration-500 ease-in-out dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900">
              <p className="text-gray-800 dark:text-gray-200 font-medium">
                reviews and reveiw for will display her
              </p>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </>
  );
}
