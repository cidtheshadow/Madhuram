export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0F0F23',
        primary: '#8B5CF6',
        secondary: '#06B6D4',
        accent: '#FCD34D'
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        heading: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
