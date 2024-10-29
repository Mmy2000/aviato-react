// Footer.js
import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-16">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
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
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
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

          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Contact Us
            </h2>
            <ul className="space-y-3">
              {[
                {
                  label: "Phone",
                  icon: "fas fa-phone-alt",
                  value: "+1 234 567 890",
                },
                {
                  label: "Email",
                  icon: "fas fa-envelope",
                  value: "info@yourcompany.com",
                },
                {
                  label: "Address",
                  icon: "fas fa-map-marker-alt",
                  value: "123 Main St, City, Country",
                },
              ].map((contact, index) => (
                <li
                  key={index}
                  className="text-gray-600 dark:text-gray-400 flex items-center space-x-2"
                >
                  <i className={`${contact.icon} mr-2`}></i>
                  <span>{contact.value}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Subscribe
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Stay updated with the latest news and offers.
            </p>
            <form className="flex flex-col items-center space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-6 w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
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
