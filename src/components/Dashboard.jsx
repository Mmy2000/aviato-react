

import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import Spinner from "../ui/Spinner";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);



const Dashboard = () => {
  let headers = {
    Authorization: `Bearer ${localStorage.getItem("userTaken")}`,
  };
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/dashboard/`,
        {
          headers,
        }
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          No data available
        </p>
      </div>
    );
  }

  const { metrics, recent_activity } = data;

  const chartData = {
    labels: ["8 days ago", "4 days ago", "Today"],
    datasets: [
      {
        label: "Revenue",
        data: [795.6, 3049.8, 6089.4],
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        tension: 0.4,
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#4CAF50",
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "#333",
        titleColor: "#fff",
        bodyColor: "#fff",
        footerColor: "#fff",
        borderWidth: 1,
        borderColor: "#4CAF50",
        padding: 10,
        callbacks: {
          label: function (context) {
            return ` $${context.raw.toFixed(2)}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(200, 200, 200, 0.2)",
        },
        ticks: {
          color: "#666",
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          color: "rgba(200, 200, 200, 0.2)",
          drawBorder: false,
        },
        ticks: {
          color: "#666",
          font: {
            size: 12,
          },
          callback: function (value) {
            return `$${value}`;
          },
        },
      },
    },
    elements: {
      point: {
        radius: 6,
        backgroundColor: "#4CAF50",
      },
      line: {
        borderWidth: 3,
      },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen p-6">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Dashboard
          </h1>
          <button
            className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded shadow-lg transition duration-300"
            onClick={fetchData} // Call fetchData directly
          >
            Refresh
          </button>
        </div>

        {/* Stats Section */}
        <motion.section
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {[
            {
              title: "Total Users",
              value: metrics.total_users,
              change: metrics.total_users_change,
              color: "blue",
            },
            {
              title: "Revenue",
              value: `$${metrics.total_revenue.toFixed(2)}`,
              change: metrics.revenue_change,
              color: "green",
            },
            {
              title: "New Orders",
              value: metrics.new_orders,
              change: metrics.new_orders_change,
              color: "red",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className={`bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl rounded-lg p-6 transition duration-300 border-l-4 border-${stat.color}-500`}
              variants={fadeIn}
            >
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                {stat.title}
              </h2>
              <p
                className={`text-4xl font-bold text-${stat.color}-600 dark:text-${stat.color}-400 mt-2`}
              >
                {stat.value}
              </p>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {stat.change} since last month
              </span>
            </motion.div>
          ))}
        </motion.section>

        {/* Recent Activity Section */}
        <section className="mt-10">
          <motion.h2
            className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            Recent Activity
          </motion.h2>
          <motion.div
            className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {recent_activity.map((activity, index) => (
                <motion.li
                  key={index}
                  className="py-4 flex justify-between items-center"
                  variants={fadeIn}
                >
                  <div>
                    <p className="text-gray-700 dark:text-gray-200 font-medium">
                      {activity.message}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {activity.details}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {activity.timestamp}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </section>

        {/* Performance Chart Section */}
        <section className="mt-10">
          <motion.h2
            className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            Performance Overview
          </motion.h2>
          <motion.div
            className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <Line data={chartData} options={chartOptions} />
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
