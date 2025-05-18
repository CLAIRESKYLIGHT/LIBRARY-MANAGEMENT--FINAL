'use client'

import { useState, useEffect } from 'react'
import {
  BookOpenIcon,
  UsersIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'
import { dashboardApi } from '../../lib/api'

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalUsers: 0,
    totalAdmins: 0,
    totalMembers: 0,
    categoryDistribution: {},
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true)
        console.log('Fetching dashboard data...')
        
        const response = await dashboardApi.getStats()
        console.log('Dashboard API Response:', response)

        if (response.data?.data) {
          const { data } = response.data
          setStats({
            totalBooks: data.total_books || 0,
            totalUsers: data.total_users || 0,
            totalAdmins: data.total_admins || 0,
            totalMembers: data.total_members || 0,
            categoryDistribution: data.category_distribution || {},
          })
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        setError(error.response?.data?.message || 'Failed to load dashboard data')
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-red-500">{error}</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Books */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 shadow-lg ring-1 ring-gray-200/50 dark:ring-gray-700/50">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-primary-50 dark:bg-primary-900/50">
              <BookOpenIcon className="h-6 w-6 text-primary-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Books</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.totalBooks}</p>
            </div>
          </div>
        </div>

        {/* Total Users */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 shadow-lg ring-1 ring-gray-200/50 dark:ring-gray-700/50">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-primary-50 dark:bg-primary-900/50">
              <UsersIcon className="h-6 w-6 text-primary-500" />
                </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.totalUsers}</p>
            </div>
          </div>
      </div>

        {/* Total Admins */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 shadow-lg ring-1 ring-gray-200/50 dark:ring-gray-700/50">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-primary-50 dark:bg-primary-900/50">
              <UserGroupIcon className="h-6 w-6 text-primary-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Admins</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.totalAdmins}</p>
            </div>
          </div>
        </div>

        {/* Total Members */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 shadow-lg ring-1 ring-gray-200/50 dark:ring-gray-700/50">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-primary-50 dark:bg-primary-900/50">
              <UsersIcon className="h-6 w-6 text-primary-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Members</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.totalMembers}</p>
                  </div>
                  </div>
                </div>
              </div>

      {/* Category Distribution */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 shadow-lg ring-1 ring-gray-200/50 dark:ring-gray-700/50">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Book Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(stats.categoryDistribution).map(([category, count]) => (
            <div
              key={category}
              className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50"
            >
              <span className="text-sm font-medium text-gray-900 dark:text-white">{category}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{count} books</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 