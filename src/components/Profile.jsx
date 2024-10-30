import React, { useContext } from "react";
import { ProfileContext } from "../context/ProfileContext";

const Profile = () => {
  const { profile, loading, error } = useContext(ProfileContext);

  if (loading) return <div>Loading...</div>;
  console.log(profile);
  
  return (
    <div>
      <h1>{profile.full_name}</h1>
      <p>{profile.headline}</p>
      {/* Display other profile fields as needed */}
    </div>
  );
};

export default Profile;
