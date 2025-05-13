"use client";
import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { ChartBarIcon, BookOpenIcon, UsersIcon } from '@heroicons/react/24/outline';
import { dashboardApi } from "@/lib/api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalUsers: 0,
    activeLoans: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await dashboardApi.getStats();
        setStats(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load dashboard data");
        setLoading(false);
        console.error("Dashboard data fetch error:", err);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (error) {
    return (
      <ProtectedRoute>
        <div className="container mx-auto px-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4">
        <h1 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
        
        {/* Stats Grid */}
        <div className="mb-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Total Books */}
          <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
            <div className="flex items-center">
              <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-900">
                <BookOpenIcon className="h-6 w-6 text-purple-600 dark:text-purple-300" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Books</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{stats.totalBooks}</p>
              </div>
            </div>
          </div>

          {/* Total Members */}
          <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
            <div className="flex items-center">
              <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900">
                <UsersIcon className="h-6 w-6 text-blue-600 dark:text-blue-300" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Members</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{stats.totalUsers}</p>
              </div>
            </div>
          </div>

          {/* Active Loans */}
          <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
            <div className="flex items-center">
              <div className="rounded-full bg-green-100 p-3 dark:bg-green-900">
                <ChartBarIcon className="h-6 w-6 text-green-600 dark:text-green-300" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Loans</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{stats.activeLoans}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
          <p className="text-gray-600 dark:text-gray-300">No recent activity to display</p>
        </div>
      </div>
    </ProtectedRoute>
  );
}
