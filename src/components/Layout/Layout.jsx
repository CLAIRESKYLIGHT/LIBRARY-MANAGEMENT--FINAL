import { useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

export default function Layout({ children }) {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div
      className={`flex h-screen bg-gray-50 ${
        darkMode ? 'dark:bg-gray-900' : ''
      }`}
    >
      <Sidebar isOpen={isSideMenuOpen} />
      <div className="flex flex-col flex-1 w-full">
        <Header
          onMenuClick={() => setIsSideMenuOpen(!isSideMenuOpen)}
          onThemeToggle={() => setDarkMode(!darkMode)}
        />
        <main className="h-full overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
