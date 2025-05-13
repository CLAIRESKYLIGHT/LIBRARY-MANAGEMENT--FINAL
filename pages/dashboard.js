import { useState, useEffect } from 'react';
import Head from 'next/head';
import { dashboardApi } from '../src/lib/api';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalBorrowed: 0,
    availableBooks: 0,
    totalUsers: 0,
    activeBorrowers: 0
  });
  const [recentBorrowings, setRecentBorrowings] = useState([]);
  const [popularBooks, setPopularBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        console.log('Fetching dashboard data...');
        
        // Test the API connection first
        try {
          const testResponse = await dashboardApi.getStats();
          console.log('API Response:', testResponse);
        } catch (testError) {
          console.error('API Connection Error:', testError);
          throw new Error(`API Connection failed: ${testError.message}`);
        }

        const [statsResponse, borrowingsResponse, booksResponse] = await Promise.all([
          dashboardApi.getStats(),
          dashboardApi.getRecentBorrowings(),
          dashboardApi.getPopularBooks()
        ]);

        console.log('Stats Response:', statsResponse.data);
        console.log('Borrowings Response:', borrowingsResponse.data);
        console.log('Books Response:', booksResponse.data);

        setStats(statsResponse.data);
        setRecentBorrowings(borrowingsResponse.data);
        setPopularBooks(booksResponse.data);
        setError(null);
      } catch (err) {
        console.error('Detailed error:', err);
        setError(`Failed to fetch dashboard data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const StatCard = ({ title, value, icon }) => (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className="text-blue-500 text-2xl">
          {icon}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading dashboard data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Library Dashboard</title>
        <meta name="description" content="Library Management System Dashboard" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Library Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Total Borrowed Books" 
            value={stats.totalBorrowed}
            icon="📚"
          />
          <StatCard 
            title="Available Books" 
            value={stats.availableBooks}
            icon="📖"
          />
          <StatCard 
            title="Total Users" 
            value={stats.totalUsers}
            icon="👥"
          />
          <StatCard 
            title="Active Borrowers" 
            value={stats.activeBorrowers}
            icon="🎯"
          />
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Borrowings</h2>
            {recentBorrowings.length > 0 ? (
              <div className="space-y-4">
                {recentBorrowings.map((borrowing) => (
                  <div key={borrowing.id} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">{borrowing.book.title}</p>
                      <p className="text-sm text-gray-500">Borrowed by: {borrowing.user.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{new Date(borrowing.borrowed_at).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No recent borrowings</p>
            )}
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Popular Books</h2>
            {popularBooks.length > 0 ? (
              <div className="space-y-4">
                {popularBooks.map((book) => (
                  <div key={book.id} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">{book.title}</p>
                      <p className="text-sm text-gray-500">Author: {book.author}</p>
                    </div>
                    <p className="text-sm text-gray-500">Borrowed {book.borrow_count} times</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No popular books data available</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 