import React, { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../context/ProfileContext";
import { motion } from "framer-motion";
import Spinner from "../ui/Spinner";
import toast from "react-hot-toast";


const Profile = () => {
  const { profile, loading, error, setProfile } = useContext(ProfileContext);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    country: "",
    city: "",
    phone_number: "",
    about: "",
    addressLineOne: "",
  });
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    if (profile) {
      const initialProfileData = {
        first_name: profile?.user?.first_name || "",
        last_name: profile?.user?.last_name || "",
        country: profile?.country || "",
        city: profile?.city || "",
        phone_number: profile?.user?.phone_number || "",
        about: profile?.about || "",
        addressLineOne: profile?.address_line_1 || "",
      };
      setFormData(initialProfileData);
      setInitialData(initialProfileData); // Save initial data
    }
  }, [profile]);

  const hasChanges = JSON.stringify(formData) !== JSON.stringify(initialData);

  if (loading)
    return (
      <div className="flex items-center w-full justify-center">
        <Spinner />
      </div>
    );
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });
    if (file) formDataToSend.append("image", file);
    const userToken = localStorage.getItem("userTaken");

    if (!userToken) {
      console.error("User token not found in localStorage.");
      toast.error("Unable to update profile. Please log in again.");
      setSaving(false);
      return;
    }
    

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/accounts/api/profile/",
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${userToken}` },
          body: formDataToSend,
        }
      );
      const data = await response.json();      

      if (response.ok) {
        setProfile(data?.data); // Update context
        toast.success("Profile updated Successfully");    
            
        setEditMode(false);
      } else {
        console.error("Failed to update profile:", data);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setSaving(false);
    }
  };

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
            className="w-36 h-36 rounded-full border-4 object-cover border-indigo-600 dark:border-indigo-500 shadow-lg"
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
            <strong>Country:</strong> {profile?.country}
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
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Individual Input Fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                First Name
              </label>
              <motion.input
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                type="text"
                className="w-full p-3 mt-2 border rounded-xl shadow-sm text-gray-800 dark:text-gray-200 dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-600"
                whileHover={{ scale: 1.05 }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Last Name
              </label>
              <motion.input
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                type="text"
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
                name="country"
                value={formData.country}
                onChange={handleInputChange}
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
                name="city"
                value={formData.city}
                onChange={handleInputChange}
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
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
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
                name="addressLineOne"
                value={formData.addressLineOne}
                onChange={handleInputChange}
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
              name="about"
              value={formData.about}
              onChange={handleInputChange}
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
                className="w-12 h-12 object-cover rounded-full border border-gray-200 dark:border-gray-600 shadow-md"
              />
              <input
                type="file"
                onChange={handleFileChange}
                className="text-sm text-gray-500 dark:text-gray-300"
              />
            </div>
          </motion.div>

          {/* Save Button */}
          <motion.button
            type="submit"
            disabled={saving || (!hasChanges && !file)}
            className="w-full bg-gray-800 transition-colors hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 dark:bg-slate-600 dark:hover:bg-slate-500 flex items-center justify-center"
            whileTap={{ scale: 0.95 }}
          >
            {saving ? (
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
                <span>Saving...</span>
              </>
            ) : (
              "Save Changes"
            )}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Profile;
