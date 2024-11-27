import React from "react";
import { motion } from "framer-motion";
import Slider from "react-slick"; // Import React Slick
import "slick-carousel/slick/slick.css"; // Import Slick styles
import "slick-carousel/slick/slick-theme.css"; // Import theme styles
import { Link } from "react-router-dom";
import { ArrowRight, Check, Star } from "lucide-react";
import slide1 from "../assets/banner1.png";
import slide2 from "../assets/black_friday.png";
import slide3 from "../assets/Exclusive_Phone_3.png";
import Payment from "./Payment";
import NewsletterForm from "./Newsletters";
import Reviews from "./Reviews";
import MaxWidthWrapper from "./MaxWidthWrapper";
import CustomerReviews from "./CustomerReviews";
import { Button } from "@headlessui/react";
import { Helmet } from "react-helmet";
import LatestProducts from "./LatestProducts";

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
    <>
      <Helmet>
        <title>Aviato</title>
      </Helmet>
      <div className=" text-gray-800 dark:text-gray-200">
        <MaxWidthWrapper className="pb-24 pt-10 lg:grid lg:grid-cols-3 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 ">
          <div className="col-span-2 px-6 lg:px-0 lg:pt-4">
            <div className="relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start">
              <div className="absolute w-28 left-0 -top-20 hidden lg:block">
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t via-slate-50/50 from-slate-50   h-28" />
                <img src="/home.png" className="w-full" />
              </div>
              <h1 className="relative w-fit dark:text-gray-200 tracking-tight text-balance mt-16 font-bold !leading-tight text-gray-900 text-4xl md:text-5xl ">
                Discover{" "}
                <span className="bg-gray-600 px-2 dark:text-gray-200 text-white">
                  Quality,
                </span>{" "}
                Style and Convenience in Every Product
              </h1>
              <p className="mt-8 font-medium text-lg lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap">
                Welcome to <span className="font-extrabold">Aviato</span> , your
                one-stop destination for premium products at unbeatable prices.
                Explore our wide selection of high-quality items
              </p>
              <ul className="mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start">
                <div className="space-y-2">
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />
                    High-quality, durable material
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />5 year
                    print guarantee
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />
                    Modern iPhone models supported
                  </li>
                </div>
              </ul>
              <Reviews />
            </div>
          </div>
          <div className="col-span-full lg:col-span-1 w-full flex justify-center px-8 sm:px-16 md:px-0 mt-32 lg:mx-0 lg:mt-20 h-fit">
            <div className="relative md:max-w-xl flex justify-center items-center">
              <div className="relative rounded-lg overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-105 group">
                <img
                  src="/home2.png"
                  alt="Custom Phone Case"
                  className="w-[500px] h-[400px] object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-semibold">
                      New Men Collection
                    </h3>
                    <p className="text-sm mt-2">
                      tailored to meet your every need
                    </p>
                    <Link to={"/products"}>
                      <Button className="rounded mt-2 bg-slate-600 py-2 px-4 text-sm text-white data-[hover]:bg-slate-500 data-[active]:bg-slate-700 transition-colors">
                        Shop Now
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 bg-blue-600 w-12 h-12 flex items-center justify-center rounded-full shadow-lg group-hover:bg-blue-800 transition-all duration-300">
                  <span className="text-white text-lg font-semibold">NEW</span>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
        <Payment />
        <LatestProducts/>
        <CustomerReviews />
      </div>
    </>
  );
};

export default Home;
