import { NextResponse } from 'next/server'

// Mock data
const books = [
  { 
    id: 1, 
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    category: 'Fiction',
    published_date: '1925-04-10'
  },
  { 
    id: 2, 
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    category: 'Fiction',
    published_date: '1960-07-11'
  },
  { 
    id: 3, 
    title: '1984',
    author: 'George Orwell',
    category: 'Science Fiction',
    published_date: '1949-06-08'
  },
]

const users = [
  { 
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin'
  },
  { 
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'member'
  },
  { 
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'member'
  },
]

export async function GET(request) {
  try {
    // Calculate statistics
    const totalBooks = books.length
    const totalUsers = users.length
    const totalAdmins = users.filter(user => user.role === 'admin').length
    const totalMembers = users.filter(user => user.role === 'member').length
    
    // Get category distribution
    const categoryDistribution = books.reduce((acc, book) => {
      acc[book.category] = (acc[book.category] || 0) + 1
      return acc
    }, {})

    // Recent activity
    const recentActivity = [
      {
        id: 1,
        type: 'book',
        action: 'added',
        book: { title: 'The Great Gatsby' },
        timestamp: new Date().toISOString(),
      },
      {
        id: 2,
        type: 'user',
        action: 'registered',
        user: { name: 'John Doe' },
        timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      },
      {
        id: 3,
        type: 'book',
        action: 'added',
        book: { title: 'To Kill a Mockingbird' },
        timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      },
      {
        id: 4,
        type: 'user',
        action: 'registered',
        user: { name: 'Jane Smith' },
        timestamp: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
      },
    ]

    const response = {
      stats: {
        totalBooks,
        totalUsers,
        totalAdmins,
        totalMembers,
        categoryDistribution,
      },
      recentActivity,
    }

    console.log('API Response:', response)
    return NextResponse.json(response)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
} 