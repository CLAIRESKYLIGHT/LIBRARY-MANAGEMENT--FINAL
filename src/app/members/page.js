'use client'

import ProtectedRoute from '@/components/ProtectedRoute'

export default function MembersPage() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4">
        <h1 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">Members Management</h1>
        <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
          <p className="text-gray-600 dark:text-gray-300">Members content will go here</p>
        </div>
      </div>
    </ProtectedRoute>
  )
} 