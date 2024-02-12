/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		minWidth: {
			"1/4": "30%",
			"1/2": "50%",
		},
		maxWidth: {
			"1/4": "30%",
		},
		colors: {
			transparent: "transparent",
			current: "currentColor",
			black: colors.black,
			white: colors.white,
			zinc: colors.zinc,
			grey: {
				1000: "#1D1D1D",
				900: "#202225",
				850: "#292b2f",
				800: "#2f3136",
				700: "#36393f",
				600: "#4f545c",
				400: "#d4d7dc",
				300: "#e3e5e8",
				200: "#ebedef",
				100: "#f2f3f5",
			},
			rose: {
				100: "#ff707c",
				200: "#FF4655",
				300: "#E92D3C",
				400: "#E82132",
			},
			red: "#e60000",
			cordovan: {
				300: "#C85669",
				400: "#b93c51",
				500: "#912F40",
			},
		},
		extend: {
			fontFamily: {
				poppins: ["Poppins"],
				anton: ["Anton"],
				val: ["VALORANT", "sans-serif"],
			},
		},
	},
	plugins: [require("tailwind-scrollbar")],
};
