// Footer.js
import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import NewsletterForm from "./Newsletters";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {

  const contacts = [
    {
      label: "Phone",
      icon: <FaPhoneAlt />,
      value: "+1 234 567 890",
    },
    {
      label: "Email",
      icon: <FaEnvelope />,
      value: "info@yourcompany.com",
    },
    {
      label: "Address",
      icon: <FaMapMarkerAlt />,
      value: "123 Main St, City, Country",
    },
  ];

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-16">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {/* Company Info */}
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
              Your Company
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Empowering businesses and individuals with innovative solutions.
              Your success is our priority.
            </p>
            <div className="flex space-x-4">
              {/* Social Media Icons */}
              {[
                { icon: FaFacebookF, href: "#" },
                { icon: FaTwitter, href: "#" },
                { icon: FaInstagram, href: "#" },
                { icon: FaLinkedinIn, href: "#" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-transform transform hover:scale-110"
                  aria-label={`Link to ${social.icon.displayName}`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className=" flex gap-10 ">
            <div className=" space-y-3">
              <h2 className="text-xl  font-semibold text-gray-800 dark:text-white">
                Quick Links
              </h2>
              <ul className="space-y-3">
                {["About Us", "Services", "Contact", "Privacy Policy"].map(
                  (link, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors duration-300"
                        aria-label={`Navigate to ${link}`}
                      >
                        {link}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className="">
              <div className="space-y-3">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Contact Us
                </h2>
                <ul className="space-y-3 ">
                  {contacts.map((contact, index) => (
                    <li
                      key={index}
                      className="text-gray-600 dark:text-gray-400 flex items-center"
                    >
                      <span className="mr-2 text-xl">{contact.icon}</span>
                      <span>{contact.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Info */}

          {/* Newsletter */}
          <div className="space-y-4 ">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Subscribe
            </h2>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-gray-300 dark:border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {["Terms of Service", "Privacy Policy"].map((item, index) => (
              <a
                key={index}
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors duration-300"
                aria-label={`Navigate to ${item}`}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
