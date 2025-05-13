import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Sidebar({ isOpen }) {
  const router = useRouter()

  const menuItems = [
    { href: '/', icon: 'home', label: 'Dashboard' },
    { href: '/forms', icon: 'forms', label: 'Forms' },
    { href: '/cards', icon: 'cards', label: 'Cards' },
    { href: '/charts', icon: 'charts', label: 'Charts' },
    // Add more menu items
  ]

  return (
    <aside
      className={`z-20 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0 ${
        isOpen ? 'block' : 'hidden'
      }`}
    >
      <div className="py-4 text-gray-500 dark:text-gray-400">
        <Link
          href="/"
          className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
        >
          Windmill
        </Link>
        <ul className="mt-6">
          {menuItems.map((item) => (
            <li key={item.href} className="relative px-6 py-3">
              {router.pathname === item.href && (
                <span
                  className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                  aria-hidden="true"
                />
              )}
              <Link
                href={item.href}
                className={`inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 ${
                  router.pathname === item.href
                    ? 'text-gray-800 dark:text-gray-100'
                    : ''
                }`}
              >
                {/* Add your SVG icons here */}
                <span className="ml-4">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
