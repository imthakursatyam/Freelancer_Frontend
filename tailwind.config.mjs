/** @type {import('tailwindcss').Config} */

 
export default{
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'rajdhani': ['Rajdhani', 'sans-serif'],
        'dongle': ['Dongle', 'sans-serif'],
        'spectral': ['Spectral SC', 'serif'],
        'lato': ['Lato', 'sans-serif']
        },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        fadeInOut: {
          '0%, 100%': { opacity: '0' },
          '50%': { opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
      animation: {
        fadeInOut: 'fadeInOut 5s ease-in-out infinite',
        fadeIn: 'fadeIn 3s ease-in forwards',
        fadeOut: 'fadeOut 3s ease-out forwards',
      },
    },
  },
  plugins: [],
};
