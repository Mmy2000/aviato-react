import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../ui/Spinner";

const Dashboard = () => {
  const [data, setData] = useState(null); // State to store API data
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/dashboard/`
        ); // Replace with your actual endpoint
        setData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <Spinner/>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">No data available</p>
      </div>
    );
  }
  console.log(data);
  

  const { metrics, recent_activity } = data;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="container mx-auto">
        {/* Stats Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              Total Users
            </h2>
            <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mt-2">
              {metrics.total_users}
            </p>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {metrics.total_users_change} since last month
            </span>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              Revenue
            </h2>
            <p className="text-4xl font-bold text-green-600 dark:text-green-400 mt-2">
              ${metrics.total_revenue.toFixed(2)}
            </p>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {metrics.revenue_change} since last month
            </span>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              New Orders
            </h2>
            <p className="text-4xl font-bold text-red-600 dark:text-red-400 mt-2">
              {metrics.new_orders}
            </p>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {metrics.new_orders_change} since last week
            </span>
          </div>
        </section>

        {/* Activity Section */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Recent Activity
          </h2>
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {recent_activity.map((activity, index) => (
                <li
                  key={index}
                  className="py-4 flex justify-between items-center"
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
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Chart Section */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Performance Overview
          </h2>
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 h-64 flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">
              [Insert Chart Here]
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
