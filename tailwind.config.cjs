/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.tsx', './index.html'],
	darkMode: 'class',
	purge: ['./src/**/*.tsx', './index.html'],
	theme: {
		extend: {
			colors: {
        primary: {
          light: '#4ADE80',
          dark: '#22C55E', 
        },
        secondary: {
          light: '#60A5FA', 
          dark: '#3B82F6', 
        },
			},
			keyframes: {
				slideIn: {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0)' },
				},
				slideOut: {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(200%)' },
				},
			},
			animation: {
				slideInAndOut:
					'slideIn 0.3s ease-in-out forwards, slideOut 0.3s ease-in-out forwards 5s',
			},
		},
	},
	plugins: [],
}
