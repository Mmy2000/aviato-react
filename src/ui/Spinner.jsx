import React from "react";
import { motion } from "framer-motion";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <motion.div
        className="professional-spinner"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear",
        }}
      ></motion.div>
    </div>
  );
};

export default Spinner;
