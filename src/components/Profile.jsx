import React, { useContext, useState } from "react";
import { ProfileContext } from "../context/ProfileContext";
import { motion } from "framer-motion";
import Spinner from "../ui/Spinner";

const Profile = () => {
  const { profile, loading, error } = useContext(ProfileContext);
  const [editMode, setEditMode] = useState(false);

  if (loading)
    return (
      <Spinner/>
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col lg:flex-row lg:space-x-10 max-w-5xl mx-auto p-6 space-y-6 lg:space-y-0 bg-gradient-to-br from-gray-50 via-white to-gray-200 dark:from-gray-800 dark:via-gray-900 dark:to-gray-700 rounded-3xl shadow-2xl backdrop-blur-lg"
    >
      {/* Profile Information */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full lg:w-1/3"
      >
        <div className="flex flex-col items-center text-center space-y-4">
          <motion.img
            src={profile?.image || "default-avatar.png"}
            alt={`${profile?.full_name}'s avatar`}
            className="w-36 h-36 rounded-full border-4 border-indigo-600 dark:border-indigo-500 shadow-lg"
            whileHover={{ scale: 1.1 }}
          />
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">
            {profile?.full_name}
          </h1>
          <p className="text-indigo-600 dark:text-indigo-400 italic">
            {profile?.headline}
          </p>
        </div>

        <motion.div
          className="mt-6 p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-xl shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-gray-800 dark:text-gray-300">
            <strong>Full Name:</strong> {profile?.full_name}
          </p>
          <p className="text-gray-800 dark:text-gray-300">
            <strong>Country:</strong> {profile?.user.country}
          </p>
          <p className="text-gray-800 dark:text-gray-300">
            <strong>Email:</strong> {profile?.user?.email || "N/A"}
          </p>
          <p className="text-gray-800 dark:text-gray-300">
            <strong>Phone:</strong> {profile?.user?.phone_number || "N/A"}
          </p>
          <p className="text-gray-800 dark:text-gray-300">
            <strong>Address:</strong> {profile?.full_address}
          </p>
        </motion.div>

        <motion.div
          className="mt-6 p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-xl shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            About You
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mt-2">
            {profile?.about || "No about information provided."}
          </p>
        </motion.div>
      </motion.div>

      {/* Edit Profile Form */}
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full lg:w-2/3"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Edit Profile
        </h2>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Individual Input Fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                First Name
              </label>
              <motion.input
                type="text"
                defaultValue={profile?.user?.first_name}
                className="w-full p-3 mt-2 border rounded-xl shadow-sm text-gray-800 dark:text-gray-200 dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-600"
                whileHover={{ scale: 1.05 }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Last Name
              </label>
              <motion.input
                type="text"
                defaultValue={profile?.user?.last_name}
                className="w-full p-3 mt-2 border rounded-xl shadow-sm text-gray-800 dark:text-gray-200 dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-600"
                whileHover={{ scale: 1.05 }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Country
              </label>
              <motion.input
                type="text"
                defaultValue={profile?.country}
                className="w-full p-3 mt-2 border rounded-xl shadow-sm text-gray-800 dark:text-gray-200 dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-600"
                whileHover={{ scale: 1.05 }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                City
              </label>
              <motion.input
                type="text"
                defaultValue={profile?.city}
                className="w-full p-3 mt-2 border rounded-xl shadow-sm text-gray-800 dark:text-gray-200 dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-600"
                whileHover={{ scale: 1.05 }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Phone
              </label>
              <motion.input
                type="text"
                defaultValue={profile?.user?.phone_number}
                className="w-full p-3 mt-2 border rounded-xl shadow-sm text-gray-800 dark:text-gray-200 dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-600"
                whileHover={{ scale: 1.05 }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Address
              </label>
              <motion.input
                type="text"
                defaultValue={profile?.full_address}
                className="w-full p-3 mt-2 border rounded-xl shadow-sm text-gray-800 dark:text-gray-200 dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-600"
                whileHover={{ scale: 1.05 }}
              />
            </div>
          </div>

          {/* About Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              About You
            </label>
            <textarea
              defaultValue={profile?.about}
              className="w-full p-3 mt-2 border rounded-xl shadow-sm text-gray-800 dark:text-gray-200 dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-600"
              rows="4"
            ></textarea>
          </motion.div>

          {/* Profile Image and File Input */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-4"
          >
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Profile Image
            </label>
            <div className="flex items-center space-x-4 mt-2">
              <img
                src={profile?.image || "default-avatar.png"}
                alt="Profile"
                className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-600 shadow-md"
              />
              <input
                type="file"
                className="text-sm text-gray-500 dark:text-gray-300"
              />
            </div>
          </motion.div>

          {/* Save Button */}
          <motion.button
            type="submit"
            className="w-full bg-gray-800 transition-colors hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 dark:bg-gray-600"
            whileTap={{ scale: 0.95 }}
          >
            Save Changes
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Profile;
