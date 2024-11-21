import React from "react";
import { motion } from "framer-motion";
import Slider from "react-slick"; // Import React Slick
import "slick-carousel/slick/slick.css"; // Import Slick styles
import "slick-carousel/slick/slick-theme.css"; // Import theme styles
import { Link } from "react-router-dom";

import slide1 from "../assets/banner1.png";
import slide2 from "../assets/black_friday.png";
import slide3 from "../assets/Exclusive_Phone_3.png";
import Payment from "./Payment";

const Home = () => {
  // Array of slide data
  const slides = [
    {
      image: slide1,
      title: "Discover Amazing Deals",
      description: "Unbeatable prices on the latest gadgets and accessories.",
      buttonLabel: "Shop Electronics",
      buttonLink: "/products",
    },
    {
      image: slide2,
      title: "Black Friday Sale",
      description: "Limited-time discounts on all categories. Don't miss out!",
      buttonLabel: "Explore Deals",
      buttonLink: "/products",
    },
    {
      image: slide3,
      title: "Exclusive Phone Offers",
      description: "Get your dream phone with exclusive discounts and perks.",
      buttonLabel: "View Phones",
      buttonLink: "/products",
    },
  ];

  // Slick Slider Settings
  const settings = {
    dots: true, // Enable navigation dots
    infinite: true, // Enable infinite scrolling
    speed: 500, // Transition speed
    slidesToShow: 1, // Number of slides to show
    slidesToScroll: 1, // Number of slides to scroll at a time
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Autoplay speed in ms
    arrows: true, // Hide next/prev arrows
  };

  return (
    <div className="min-h-screen text-gray-800 dark:text-gray-200">
      <header className="relative overflow-hidden">
        {/* Image Slider */}
        <Slider {...settings} className="h-screen">
          {slides.map((slide, index) => (
            <div key={index} className="relative h-screen">
              {/* Slide Image */}
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-screen object-cover"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent dark:from-gray-900/80 z-10" />
              {/* Slide Content */}
              <div className="absolute inset-0 z-20 flex flex-col justify-center items-center px-6 text-center text-white">
                <motion.h1
                  className="text-4xl md:text-6xl font-extrabold"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  {slide.title}
                </motion.h1>
                <motion.p
                  className="mt-4 text-lg max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {slide.description}
                </motion.p>
                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <Link
                    to={slide.buttonLink}
                    className="px-6 py-3 bg-gray-100 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 transition"
                  >
                    {slide.buttonLabel}
                  </Link>
                </motion.div>
              </div>
            </div>
          ))}
        </Slider>
      </header>
      <Payment/>
    </div>
  );
};

export default Home;
