/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
	  extend: {
		// Puedes extender temas aquí si es necesario
	  },
	},
	plugins: [require("daisyui")],
	daisyui: {
	  themes: ["light", "dark"], // Puedes personalizar temas aquí si es necesario
	},
  };
  