import { NextResponse } from 'next/server'

// Mock database
let books = [
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '978-0743273565',
    category: 'Fiction',
    published_date: '1925-04-10',
  },
  {
    id: 2,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    isbn: '978-0446310789',
    category: 'Fiction',
    published_date: '1960-07-11',
  },
  {
    id: 3,
    title: '1984',
    author: 'George Orwell',
    isbn: '978-0451524935',
    category: 'Science Fiction',
    published_date: '1949-06-08',
  },
]

// GET /api/books
export async function GET() {
  return NextResponse.json(books)
}

// POST /api/books
export async function POST(request) {
  const body = await request.json()
  const newBook = {
    id: books.length + 1,
    ...body,
  }
  books.push(newBook)
  return NextResponse.json(newBook, { status: 201 })
}

// PUT /api/books/:id
export async function PUT(request, { params }) {
  const { id } = params
  const body = await request.json()
  const index = books.findIndex((book) => book.id === parseInt(id))
  
  if (index === -1) {
    return NextResponse.json({ error: 'Book not found' }, { status: 404 })
  }

  books[index] = { ...books[index], ...body }
  return NextResponse.json(books[index])
}

// DELETE /api/books/:id
export async function DELETE(request, { params }) {
  const { id } = params
  const index = books.findIndex((book) => book.id === parseInt(id))
  
  if (index === -1) {
    return NextResponse.json({ error: 'Book not found' }, { status: 404 })
  }

  books = books.filter((book) => book.id !== parseInt(id))
  return NextResponse.json({ message: 'Book deleted successfully' })
} 