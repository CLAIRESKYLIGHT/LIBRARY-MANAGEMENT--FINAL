import { useState, useEffect } from 'react';
import Head from 'next/head';

// Mock data for frontend development
const mockBooks = [
  {
    id: 1,
    isbn: "978-3-16-148410-0",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    published_date: "1925-04-10",
    quantity: 5,
    category: "Fiction"
  },
  {
    id: 2,
    isbn: "978-0-7475-3269-9",
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    published_date: "1997-06-26",
    quantity: 8,
    category: "Fantasy"
  },
  {
    id: 3,
    isbn: "978-0-316-76948-0",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    published_date: "1960-07-11",
    quantity: 3,
    category: "Fiction"
  },
  {
    id: 4,
    isbn: "978-0-452-28423-4",
    title: "1984",
    author: "George Orwell",
    published_date: "1949-06-08",
    quantity: 6,
    category: "Dystopian"
  },
  {
    id: 5,
    isbn: "978-0-7432-7356-5",
    title: "The Alchemist",
    author: "Paulo Coelho",
    published_date: "1988-01-01",
    quantity: 4,
    category: "Fiction"
  }
];

export default function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call with mock data
    const fetchBooks = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setBooks(mockBooks);
        setError(null);
      } catch (err) {
        console.error('Error fetching books:', err);
        setError(`Failed to fetch books: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading books...</div>
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
        <title>Books Dashboard</title>
        <meta name="description" content="Library Management System - Books Dashboard" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Books Dashboard</h1>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ISBN</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Published Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {books.map((book) => (
                  <tr key={book.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{book.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{book.isbn}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{book.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{book.author}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(book.published_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{book.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{book.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
} 