'use client'

import { AuthProvider } from "@/contexts/AuthContext"
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'

export default function ClientLayout({ children }) {
  return (
    <AuthProvider>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        {/* Sidebar */}
        <aside className="fixed inset-y-0 z-50 flex w-64 flex-col">
          <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white pt-5 pb-4 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex flex-shrink-0 items-center px-4">
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">Library MS</h1>
            </div>
            <Sidebar />
          </div>
        </aside>

        {/* Main content */}
        <div className="flex flex-1 flex-col pl-64">
          <Header />
          {/* Page content */}
          <main className="flex-1 overflow-y-auto bg-gray-50 p-4 dark:bg-gray-900">
            {children}
          </main>
        </div>
      </div>
    </AuthProvider>
  )
} 