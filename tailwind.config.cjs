module.exports = {
  content: ['./src/**/*.{astro,js,jsx,ts,tsx}'],
  theme: {
    extend: 
    {
      colors: 
        {
            // Background Colors
            'bg-white': 'var(--bg-white)',
            'bg-offwhite': 'var(--bg-offwhite)',
            'bg-blue': 'var(--bg-blue)',
            'bg-green': 'var(--bg-green)',
            // Text Colors
            'text-brown': 'var(--text-brown)',
            'text-blue': 'var(--text-blue)',
            'text-offwhite': 'var(--text-offwhite)',
            'text-grey': 'var(--text-grey)',
        },
    },
  },
  plugins: [],
};