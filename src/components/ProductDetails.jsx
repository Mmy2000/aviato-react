import axios, { all } from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Spinner from "../ui/Spinner";
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
import Rating from "@mui/material/Rating";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import toast from "react-hot-toast";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import Modal from "../shared/Modal";
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // Import the heart icons
import { UserContext } from "../context/UserContext";
import { wishlistContext } from "../context/AddToFavoriteContext";
import { Helmet } from "react-helmet";

export const ProductDetails = () => {
  const navigate = useNavigate();
  const { toggleFavorite, wishlistProducts } = useContext(wishlistContext);
  let { setUserLogin, userLogin } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  let { addToCart } = useContext(CartContext);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  let { id, category,brand } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingSubmitBtn, setLoadingSubmitBtn] = useState(false);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(null);
  const [subject, setSubject] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [hover, setHover] = useState(-1);
  const labels = {
    0.5: "Useless",
    1: "Useless+",
    1.5: "Poor",
    2: "Poor+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Good",
    4: "Good+",
    4.5: "Excellent",
    5: "Excellent+",
  };
  const [relatedProducts, setRelatedProducts] = useState(null);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // New state
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("userTaken")}`,
  };

  const openModal = (product) => {
    setSelectedProduct(product); // Set the clicked product
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);  


  const handleSubmit = async () => {
    if (!userLogin) {
      return toast.error("You Must Login First")
    }
    if (loadingSubmitBtn) return;
    setLoadingSubmitBtn(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/products/api/reviews/`, // adjust to your endpoint path
        {
          product: id,
          subject,
          review: reviewText,
          rating,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userTaken")}`, // use auth token if needed
          },
        }
      );

      if (response.status === 201) {
        toast.success("Review created successfully!");
        setRating(null);
        setSubject("");
        setReviewText("");
        await getProductDetails(id);
      } else {
        toast.success("Review updated successfully!");
        setRating(null);
        setSubject("");
        setReviewText("");
        await getProductDetails(id);
      }
    } catch (error) {
      toast.error("There was an error submitting your review:", error);
    } finally {
      setLoadingSubmitBtn(false);
    }
  };

  const getProductDetails = async (id) => {
    const options = {
      headers: userLogin
        ? {
            "Content-Type": "application/json",
            Authorization: headers.Authorization,
          }
        : undefined,
    };
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/products/api/product/${id}`,
        options
      );
      setProductDetails(data);
    } catch (error) {
      setError("Failed to fetch product details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };  

  const getRelatedProducts = async (category) => {
    try {
      setLoading(true);
      if (userLogin) {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/products/api/products`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: headers.Authorization,
            },
          }
        );
        let allProducts = data?.data;
        let related = allProducts.filter(
          (product) => product.category.id == category
        );
        setRelatedProducts(related);
      }else{
        const { data } = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/products/api/products`
        );
        let allProducts = data?.data;
        let related = allProducts.filter(
          (product) => product.category.id == category
        );
        setRelatedProducts(related);
      }
      
      
    } catch (error) {
      setError("Failed to fetch product details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    if (!userLogin) {
      return toast.error("You Must Login Fisrt!");
    }
    if (!product) return; // Ensure product is not null

    setLoadingBtn(true); // Set loading to true when request starts

    if (!selectedSize && !selectedColor) {
      // If no size or color is selected, handle accordingly
      addToCart(product.id, null, null, quantity)
        .then(() => {
          toast.success("Item added to cart successfully!");
          closeModal()
        })
        .catch((error) => {
          toast.error("Error adding item to cart:", error);
        })
        .finally(() => {
          setLoadingBtn(false); // Set loading to false when done
        });
      return;
    }

    if (!selectedSize || !selectedColor) {
      toast.error("Please select size and color options.");
      setLoadingBtn(false); // Stop loading if options are incomplete
      return;
    }

    // If both size and color are selected
    addToCart(
      product.id,
      selectedSize.variation_value,
      selectedColor.variation_value,
      quantity
    )
      .then(() => {
        toast.success("Item added to cart successfully!");
        closeModal()
      })
      .catch((error) => {
        toast.error("Error adding item to cart:", error);
      })
      .finally(() => {
        setLoadingBtn(false); // Set loading to false when done
      });
  };


  const handleQuantityChange = (change) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + change));
  };

   const handleToggle = (productId) => {
     if (!userLogin) {
       return toast.error("You Must Login First!");
     }
     // Toggle the favorite status
     toggleFavorite(productId); // Ensure this is updating the wishlist context properly
   };

  useEffect(() => {
    getProductDetails(id);
    getRelatedProducts(category);
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center w-full justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center w-full justify-center">{error}</div>
    );
  }
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const settings2 = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4, // Number of items to show
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };  
  

  return (
    <>
      <Helmet>
        <title>Aviato | {productDetails?.name}</title>
      </Helmet>
      <button
        onClick={() => navigate(-1)} // Navigate back to the previous page
        className="flex items-center mb-4 ml-10 px-4 py-2 mt-6 bg-gray-900 text-white rounded-l-full shadow-md hover:bg-gray-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-gray-700 dark:hover:bg-gray-600"
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
      <div className="flex flex-col justify-between md:flex-row py-8 px-8 lg:px-20  gap-8">
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
            {/* MUI Rating component */}
            <Rating
              value={productDetails?.avr_review || 0} // Display the average rating
              precision={0.5} // Allows half-star ratings if needed
              readOnly // Makes the rating non-interactive
            />

            <span className="ml-2 text-gray-600 dark:text-gray-400">
              ({productDetails?.count_review} Reviews)
            </span>
          </div>
          <motion.p
            className="text-base leading-6 text-gray-700 dark:text-gray-300 md:text-lg md:leading-7  lg:leading-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {productDetails?.description}
          </motion.p>
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

          <motion.div
            className="flex items-center space-x-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Label */}
            <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Quantity:
            </span>

            {/* Decrease Button */}
            <motion.button
              onClick={() => handleQuantityChange(-1)}
              className="w-10 h-10 text-2xl font-bold bg-gray-200 hover:bg-gray-300 rounded-full shadow-lg dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300 flex items-center justify-center transition-all"
              whileHover={{ scale: 1.15, rotate: -10 }}
              whileTap={{ scale: 0.9, rotate: 0 }}
            >
              -
            </motion.button>

            {/* Quantity Display */}
            <motion.div
              className="px-6 py-2 text-xl font-semibold bg-gray-100 rounded-lg shadow-inner dark:bg-gray-800 dark:text-gray-200"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              whileHover={{ scale: 1.05 }}
            >
              {quantity}
            </motion.div>

            {/* Increase Button */}
            <motion.button
              onClick={() => handleQuantityChange(1)}
              className="w-10 h-10 text-2xl font-bold bg-gray-200 hover:bg-gray-300 rounded-full shadow-lg dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300 flex items-center justify-center transition-all"
              whileHover={{ scale: 1.15, rotate: 10 }}
              whileTap={{ scale: 0.9, rotate: 0 }}
            >
              +
            </motion.button>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Category Section */}
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
            >
              <span className="font-semibold text-gray-700 dark:text-white">
                Category:
              </span>
              <motion.div
                className="flex items-center space-x-1 bg-gray-200 px-3 py-1 rounded-md text-sm text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                whileHover={{ scale: 1.03 }}
              >
                <Link
                  to={`/categories/${productDetails?.category?.category?.id}`}
                  className="hover:text-blue-500 hover:underline"
                >
                  {productDetails?.category?.category?.name}
                </Link>
                <span className="text-gray-500 dark:text-gray-400">/</span>
                <Link
                  to={`/categories/${productDetails?.category?.category?.id}/${productDetails?.category?.id}`}
                  className="hover:text-blue-500 hover:underline"
                >
                  {productDetails?.category?.name}
                </Link>
              </motion.div>
            </motion.div>

            {/* Brand Section */}
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
            >
              <span className="font-semibold text-gray-700 dark:text-white">
                Brand:
              </span>
              <motion.div
                className="bg-gray-200 px-3 py-1 rounded-md text-sm text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                whileHover={{ scale: 1.03 }}
              >
                <Link
                  to={`/brands/${productDetails?.PRDBrand?.id}`}
                  className="hover:text-blue-500 hover:underline"
                >
                  {productDetails?.PRDBrand?.name}
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
          <button
            onClick={() => handleAddToCart(productDetails)} // Pass productDetails to the function
            disabled={loadingBtn} // Disable the button when loading
            className="mt-4 py-2 px-4 bg-black flex items-center justify-center text-white rounded hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            {loadingBtn ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Adding to Cart...
              </>
            ) : (
              "Add to Cart"
            )}
          </button>
        </div>
      </div>
      <div className="px-4 sm:px-6 lg:px-8">
        <TabGroup className="mt-5">
          <TabList className="flex w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mx-auto space-x-2 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 p-1 dark:from-gray-700 dark:to-gray-800 shadow-lg">
            <Tab
              className={({ selected }) =>
                `w-full py-2.5 text-sm font-semibold rounded-full transition-all duration-300 ease-in-out transform ${
                  selected
                    ? "bg-white text-blue-600 dark:bg-gray-900 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-300 hover:bg-blue-50/[0.5] dark:hover:bg-gray-600"
                }`
              }
            >
              Description
            </Tab>
            <Tab
              className={({ selected }) =>
                `w-full py-2.5 text-sm font-semibold rounded-full transition-all duration-300 ease-in-out transform ${
                  selected
                    ? "bg-white text-blue-600 dark:bg-gray-900 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-300 hover:bg-blue-50/[0.5] dark:hover:bg-gray-600"
                }`
              }
            >
              Reviews ({productDetails?.count_review} reviews)
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel className="p-4 mt-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-sm transition-colors duration-500 ease-in-out dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900">
              <p className="text-gray-800 dark:text-gray-200 font-medium">
                {productDetails?.description}
              </p>
            </TabPanel>
            <TabPanel className="p-4 mt-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-sm  transition-colors duration-500 ease-in-out dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900">
              <div className="flex flex-col lg:flex-row lg:space-x-8">
                <div className="w-full lg:w-1/2 p-4">
                  <h3 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-8 text-gray-900 dark:text-gray-100">
                    Reviews for "{productDetails?.name}"
                  </h3>
                  <div className="space-y-4 lg:space-y-8">
                    {productDetails?.reviewrating &&
                    productDetails.reviewrating.length > 0 ? (
                      productDetails?.reviewrating.map((review, index) => (
                        <div
                          key={index}
                          className="flex items-start p-4 lg:p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition duration-300 ease-in-out hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-600 transform"
                        >
                          <img
                            src={
                              review?.user?.profile?.image ||
                              "default-avatar.jpg"
                            }
                            alt={review?.user?.username}
                            className="w-10 h-10 lg:w-14 lg:h-14 object-cover rounded-full mr-4 shadow-lg border-2 border-gray-200 dark:border-gray-600"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                              <h4 className="font-semibold text-sm lg:text-lg dark:text-white text-gray-900">
                                {review.user.full_name || review.user.username}
                              </h4>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {new Date(review.updated_at).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                    hour: "numeric",
                                    minute: "numeric",
                                  }
                                )}
                              </p>
                            </div>
                            <div className="flex items-center  mb-1">
                              <Rating
                                value={review.rating}
                                precision={0.5}
                                readOnly
                                sx={{
                                  color: "text-yellow-500",
                                  "& .MuiRating-iconEmpty": {
                                    color: "text-gray-300 dark:text-gray-600",
                                  },
                                }}
                              />
                            </div>
                            <h5 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">
                              {review.subject}
                            </h5>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                              {review.review}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-600 dark:text-gray-400">
                        There are no reviews yet for this product. Be the first
                        to share your thoughts!
                      </p>
                    )}
                  </div>
                </div>

                {/* Review Form */}
                <Box
                  className="w-full lg:w-1/2 p-3 mt-8 lg:mt-0" // Responsive margin control using Tailwind classes
                  sx={{
                    backgroundColor: "background.paper",
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h5" component="h4" gutterBottom>
                    Leave a review
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    How do you rate this product?
                  </Typography>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Rating
                      name="product-rating"
                      value={rating}
                      precision={0.5}
                      onChange={handleRatingChange}
                      onChangeActive={(event, newHover) => setHover(newHover)}
                    />
                    {rating !== null && (
                      <Typography sx={{ ml: 2 }}>
                        {labels[hover !== -1 ? hover : rating]}
                      </Typography>
                    )}
                  </Box>
                  <TextField
                    label="Subject"
                    variant="outlined"
                    fullWidth
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    sx={{
                      mb: 2,
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "background.default",
                        color: "text.primary",
                      },
                    }}
                  />
                  <TextField
                    label="Your Review"
                    variant="outlined"
                    multiline
                    rows={4}
                    fullWidth
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    sx={{
                      mb: 2,
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "background.default",
                        color: "text.primary",
                      },
                    }}
                  />
                  {userLogin ? (
                    <>
                      {productDetails?.is_in_orders ? (
                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth
                          onClick={handleSubmit}
                          disabled={loadingSubmitBtn}
                          sx={{
                            mt: 2,
                            backgroundColor: "black",
                            "&:hover": { backgroundColor: "gray" },
                          }}
                        >
                          {loadingSubmitBtn ? (
                            <CircularProgress
                              size={24}
                              sx={{ color: "white" }}
                            />
                          ) : (
                            "Submit Review"
                          )}
                        </Button>
                      ) : (
                        <>
                          <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleSubmit}
                            disabled={true}
                            sx={{
                              mt: 2,
                              backgroundColor: "black",
                              "&:hover": { backgroundColor: "gray" },
                            }}
                          >
                            You must purchase this product to post a review.
                          </Button>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleSubmit}
                        disabled={true}
                        sx={{
                          mt: 2,
                          backgroundColor: "black",
                          "&:hover": { backgroundColor: "gray" },
                        }}
                      >
                        You Must Login First!
                      </Button>
                    </>
                  )}
                </Box>
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
      <div className="px-5 mt-16 mx-5">
        <h1 className="text-center mb-6 dark:text-gray-200 text-xl w-full  font-bold ">
          Related Products
        </h1>
        <Slider {...settings2} className="">
          {relatedProducts?.map((product) => {
            const price = parseFloat(product.price);

            return (
              <motion.div
                key={product.id}
                className="bg-white max-h-fit main-card dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden"
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
                  <div
                    onClick={() => handleToggle(product.id)} // This will now toggle the favorite state
                    className="absolute wish-badge opacity-0 right-3 cursor-pointer border-slate-700 text-gray-800 dark:text-gray-200 dark:border-slate-200 text-sm font-semibold px-2 py-2 rounded-full shadow-lg"
                  >
                    {wishlistProducts.some((item) => item.id === product.id) ? (
                      <motion.div
                        key="filled-heart"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 15,
                        }}
                      >
                        <FaHeart size={24} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="empty-heart"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 15,
                        }}
                      >
                        <FaRegHeart size={24} />
                      </motion.div>
                    )}
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
                    onClick={() => openModal(product)}
                  >
                    <FaShoppingCart className="mr-2" />
                    Quick Add
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </Slider>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={
          selectedProduct?.color_variations?.length > 0 ||
          selectedProduct?.size_variations?.length > 0
            ? "Choose Variations & Quantity"
            : "Choose Quantity"
        }
        onSubmit={() => {
          handleAddToCart(selectedProduct); // Pass selected product to handleAddToCart
        }}
        loading={loadingBtn}
      >
        <div className="flex items-center space-x-3">
          <span className="font-semibold text-gray-800 dark:text-gray-200">
            Quantity:
          </span>
          <button
            onClick={() => handleQuantityChange(-1)}
            className="w-8 h-8 text-xl font-bold bg-gray-200 hover:bg-gray-300 rounded-full shadow dark:bg-gray-600 dark:hover:bg-gray-700 dark:text-gray-300 transition-all duration-150 ease-in-out flex items-center justify-center"
          >
            -
          </button>
          <span className="px-4 py-1 text-lg font-semibold bg-gray-100 rounded-md dark:bg-gray-600 dark:text-gray-200">
            {quantity}
          </span>
          <button
            onClick={() => handleQuantityChange(1)}
            className="w-8 h-8 text-xl font-bold bg-gray-200 hover:bg-gray-300 rounded-full shadow dark:bg-gray-600 dark:hover:bg-gray-700 dark:text-gray-300 transition-all duration-150 ease-in-out flex items-center justify-center"
          >
            +
          </button>
        </div>
        {(selectedProduct?.color_variations?.length > 0 ||
          selectedProduct?.size_variations?.length > 0) && (
          <>
            <div className="flex space-x-20 mt-4">
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
          </>
        )}
      </Modal>
    </>
  );
};
