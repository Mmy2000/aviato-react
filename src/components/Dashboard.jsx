import React from "react";

const Dashboard = () => {
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
              1,234
            </p>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              +15% since last month
            </span>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              Revenue
            </h2>
            <p className="text-4xl font-bold text-green-600 dark:text-green-400 mt-2">
              $12,345
            </p>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              +8% since last month
            </span>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              New Orders
            </h2>
            <p className="text-4xl font-bold text-red-600 dark:text-red-400 mt-2">
              567
            </p>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              +5% since last week
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
              <li className="py-4 flex justify-between items-center">
                <div>
                  <p className="text-gray-700 dark:text-gray-200 font-medium">
                    John Doe placed an order
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Order Total: $123.45
                  </p>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  2 hours ago
                </span>
              </li>
              <li className="py-4 flex justify-between items-center">
                <div>
                  <p className="text-gray-700 dark:text-gray-200 font-medium">
                    Jane Smith signed up
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Account created
                  </p>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  4 hours ago
                </span>
              </li>
              <li className="py-4 flex justify-between items-center">
                <div>
                  <p className="text-gray-700 dark:text-gray-200 font-medium">
                    Alex Johnson updated profile
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Profile details updated
                  </p>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  6 hours ago
                </span>
              </li>
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
