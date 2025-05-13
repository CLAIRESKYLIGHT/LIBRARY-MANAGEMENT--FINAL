/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gray: {
          50: '#f9fafb',
          100: '#f4f5f7',
          200: '#e5e7eb',
          300: '#d5d6d7',
          400: '#9e9e9e',
          500: '#707275',
          600: '#4c4f52',
          700: '#24262d',
          800: '#1a1c23',
          900: '#121317',
        },
        purple: {
          50: '#f6f5ff',
          100: '#edebfe',
          200: '#dcd7fe',
          300: '#cabffd',
          400: '#ac94fa',
          500: '#9061f9',
          600: '#7e3af2',
          700: '#6c2bd9',
          800: '#5521b5',
          900: '#4a1d96',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
