import { NextResponse } from 'next/server'

// Mock database
let users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'member',
    isbn: '978-0743273565',
    password: 'hashed_password_1', // In a real application, passwords should be properly hashed
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'librarian',
    isbn: '978-0446310789',
    password: 'hashed_password_2',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    role: 'member',
    isbn: '978-0451524935',
    password: 'hashed_password_3',
  },
]

// GET /api/users
export async function GET() {
  // Don't send passwords in the response
  const usersWithoutPasswords = users.map(({ password, ...user }) => user)
  return NextResponse.json(usersWithoutPasswords)
}

// POST /api/users
export async function POST(request) {
  const body = await request.json()
  const newUser = {
    id: users.length + 1,
    ...body,
  }
  users.push(newUser)
  // Don't send password in the response
  const { password, ...userWithoutPassword } = newUser
  return NextResponse.json(userWithoutPassword, { status: 201 })
}

// PUT /api/users/:id
export async function PUT(request, { params }) {
  const { id } = params
  const body = await request.json()
  const index = users.findIndex((user) => user.id === parseInt(id))
  
  if (index === -1) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const updatedUser = {
    ...users[index],
    ...body,
  }
  users[index] = updatedUser
  // Don't send password in the response
  const { password, ...userWithoutPassword } = updatedUser
  return NextResponse.json(userWithoutPassword)
}

// DELETE /api/users/:id
export async function DELETE(request, { params }) {
  const { id } = params
  const index = users.findIndex((user) => user.id === parseInt(id))
  
  if (index === -1) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  users = users.filter((user) => user.id !== parseInt(id))
  return NextResponse.json({ message: 'User deleted successfully' })
} 