/** @type {import('tailwindcss').Config} */
module.exports = {
	// NOTE: Update this to include the paths to all of your component files.
	content: [
		"./app/**/*.{js,jsx,ts,tsx}",
		"./theme/**/*.{js,jsx,ts,tsx}",
		"./hooks/**/*.{js,jsx,ts,tsx}",
		"./components/**/*.{js,jsx,ts,tsx}",
		"./contexts/**/*.{js,jsx,ts,tsx}",
		"./forms/**/*.{js,jsx,ts,tsx}",
	],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {
			colors: {
				// Grey scale
				grey: {
					0: "#FFFFFF",
					100: "#F9FAFB",
					200: "#F4F6F8",
					300: "#DFE3E8",
					400: "#C4CDD5",
					500: "#919EAB",
					600: "#637381",
					700: "#454F5B",
					800: "#212B36",
					900: "#161C24",
				},
				// Primary
				primary: {
					lighter: "#3596f7",
					light: "#1b89f6",
					DEFAULT: "#027cf5",
					dark: "#0270dd",
					darker: "#0263c4",
				},
				// Secondary
				secondary: {
					lighter: "#3596f7",
					light: "#1b89f6",
					DEFAULT: "#027cf5",
					dark: "#0270dd",
					darker: "#0263c4",
				},
				// Info
				info: {
					lighter: "#CAFDF5",
					light: "#61F3F3",
					DEFAULT: "#00B8D9",
					dark: "#006C9C",
					darker: "#003768",
				},
				// Success
				success: {
					lighter: "#D3FCD2",
					light: "#77ED8B",
					DEFAULT: "#22C55E",
					dark: "#118D57",
					darker: "#065E49",
				},
				// Warning
				warning: {
					lighter: "#FFF5CC",
					light: "#FFD666",
					DEFAULT: "#FFAB00",
					dark: "#B76E00",
					darker: "#7A4100",
				},
				// Error
				error: {
					lighter: "#FFE9D5",
					light: "#FFAC82",
					DEFAULT: "#FF5630",
					dark: "#B71D18",
					darker: "#7A0916",
				},
				// Brown
				brown: {
					lighter: "#ae7d5a",
					light: "#a26a42",
					DEFAULT: "#8b4513",
					dark: "#7d3e11",
					darker: "#61300d",
				},
				// Orange
				orange: {
					lighter: "#ff9e5d",
					light: "#ff9146",
					DEFAULT: "#ff7518",
					dark: "#e66916",
					darker: "#cc5e13",
				},
				// Red
				red: {
					lighter: "#FFE3D5",
					light: "#FFC1AC",
					DEFAULT: "#FF3030",
					dark: "#B71833",
					darker: "#7A0930",
				},
				// Common
				common: {
					black: "#000000",
					white: "#FFFFFF",
				},
				// Preset Colors
				cyan: {
					lighter: "#CCF4FE",
					light: "#68CDF9",
					DEFAULT: "#078DEE",
					dark: "#0351AB",
					darker: "#012972",
				},
				purple: {
					lighter: "#EBD6FD",
					light: "#B985F4",
					DEFAULT: "#7635dc",
					dark: "#431A9E",
					darker: "#200A69",
				},
				blue: {
					lighter: "#D1E9FC",
					light: "#76B0F1",
					DEFAULT: "#2065D1",
					dark: "#103996",
					darker: "#061B64",
				},
				green: {
					lighter: "#61e29b",
					light: "#4edf8f",
					DEFAULT: "#3adb82",
					dark: "#34c575",
					darker: "#2eaf68",
				},
			},
			// Typography
			fontFamily: {
				primary: ["Public Sans", "Helvetica", "Arial", "sans-serif"],
				secondary: ["Barlow", "Helvetica", "Arial", "sans-serif"],
			},
			fontSize: {
				h1: ["2.5rem", { lineHeight: "5rem" }], // 40px
				h2: ["2rem", { lineHeight: "4rem" }], // 32px
				h3: ["1.5rem", { lineHeight: "2.25rem" }], // 24px
				h4: ["1.25rem", { lineHeight: "1.875rem" }], // 20px
				h5: ["1.125rem", { lineHeight: "1.6875rem" }], // 18px
				h6: ["1.0625rem", { lineHeight: "1.75rem" }], // 17px
				subtitle1: ["1rem", { lineHeight: "1.5rem" }], // 16px
				subtitle2: ["0.875rem", { lineHeight: "1.375rem" }], // 14px
				body1: ["1rem", { lineHeight: "1.5rem" }], // 16px
				body2: ["0.875rem", { lineHeight: "1.375rem" }], // 14px
				caption: ["0.75rem", { lineHeight: "1.125rem" }], // 12px
				overline: ["0.75rem", { lineHeight: "1.125rem" }], // 12px
			},
			fontWeight: {
				regular: 400,
				medium: 500,
				semibold: 600,
				bold: 700,
				extrabold: 800,
			},
			// Shadows
			boxShadow: {
				0: "none",
				1: "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
				2: "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
				// Add more shadows up to 24 as per your MUI shadows.ts
				24: "0px 11px 15px -7px rgba(0,0,0,0.2), 0px 24px 38px 3px rgba(0,0,0,0.14), 0px 9px 46px 8px rgba(0,0,0,0.12)",
			},
			// Border Radius
			borderRadius: {
				DEFAULT: "8px",
			},
			// Custom utilities for backgrounds, blur, etc.
			backgroundImage: {
				"cyan-red-blur":
					"url(/assets/cyan-blur.png), url(/assets/red-blur.png)",
			},
			backdropFilter: {
				blur: "blur(20px)",
			},
		},
	},
	plugins: [	],
};
