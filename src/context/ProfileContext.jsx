import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios"; // Assuming axios is being used for HTTP requests
import { UserContext } from "./UserContext";


// Create a Profile Context
export const ProfileContext = createContext();

// Create a Context Provider component
export const ProfileContextProvider = (props) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let { userLogin } = useContext(UserContext);

  let headers = {
    Authorization: `Bearer ${localStorage.getItem("userTaken")}`,
  };  
  console.log(headers);
  

  // Function to fetch the profile data
  const fetchProfile = async () => {
    try {
      // Make an authenticated request to fetch the profile data
      const response = await axios.get(
        "http://127.0.0.1:8000/accounts/api/profile/",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: headers.Authorization, // Add the Authorization header here
          },
        }
      ); // Change this URL to your profile endpoint
      setProfile(response?.data); // Store the fetched data in state
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch profile data when the component mounts
  useEffect(() => {
    fetchProfile();
  }, [userLogin]);

  return (
    <ProfileContext.Provider value={{ profile, loading, error }}>
      {props.children}
    </ProfileContext.Provider>
  );
};
