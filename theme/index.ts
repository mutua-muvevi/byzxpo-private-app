import { useTheme } from "./provider";

export { useTheme };

// app/theme/palette.ts
export const grey = {
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
};

export const primary = {
	lighter: "#3596f7",
	light: "#1b89f6",
	main: "#027cf5",
	dark: "#0270dd",
	darker: "#0263c4",
	contrastText: "#FFFFFF",
};

// Repeat for secondary, info, success, warning, error, brown, orange, red, common
export const secondary = { ...primary }; // Same as primary in your config
export const info = {
	lighter: "#CAFDF5",
	light: "#61F3F3",
	main: "#00B8D9",
	dark: "#006C9C",
	darker: "#003768",
	contrastText: "#FFFFFF",
};
export const success = {
	lighter: "#D3FCD2",
	light: "#77ED8B",
	main: "#22C55E",
	dark: "#118D57",
	darker: "#065E49",
	contrastText: "#ffffff",
};
export const warning = {
	lighter: "#FFF5CC",
	light: "#FFD666",
	main: "#FFAB00",
	dark: "# GasshB76E00",
	darker: "#7A4100",
	contrastText: grey[800],
};
export const error = {
	lighter: "#FFE9D5",
	light: "#FFAC82",
	main: "#FF5630",
	dark: "#B71D18",
	darker: "#7A0916",
	contrastText: "#FFFFFF",
};
export const brown = {
	lighter: "#ae7d5a",
	light: "#a26a42",
	main: "#8b4513",
	dark: "#7d3e11",
	darker: "#61300d",
	contrastText: "#FFFFFF",
};
export const orange = {
	lighter: "#ff9e5d",
	light: "#ff9146",
	main: "#ff7518",
	dark: "#e66916",
	darker: "#cc5e13",
	contrastText: "#000000",
};
export const red = {
	lighter: "#FFE3D5",
	light: "#FFC1AC",
	main: "#FF3030",
	dark: "#B71833",
	darker: "#7A0930",
	contrastText: "#FFFFFF",
};
export const common = {
	black: "#000000",
	white: "#FFFFFF",
};

export const action = {
	hover: `rgba(145, 158, 171, 0.08)`, // grey[500] alpha 0.08
	selected: `rgba(145, 158, 171, 0.16)`,
	disabled: `rgba(145, 158, 171, 0.8)`,
	disabledBackground: `rgba(145, 158, 171, 0.24)`,
	focus: `rgba(145, 158, 171, 0.24)`,
	hoverOpacity: 0.08,
	disabledOpacity: 0.48,
};

export const palette = (mode: "light" | "dark") => {
	const light = {
		mode: "light",
		primary,
		secondary,
		info,
		success,
		warning,
		error,
		grey,
		brown,
		orange,
		red,
		common,
		divider: `rgba(145, 158, 171, 0.2)`, // grey[500] alpha 0.2
		action: {
			...action,
			active: grey[600],
		},
		text: {
			primary: grey[800],
			secondary: grey[600],
			disabled: grey[500],
		},
		background: {
			paper: grey[200],
			default: "#FFFFFF",
			neutral: grey[200],
			navs: "#FFFFFF",
		},
	};

	const dark = {
		mode: "dark",
		primary,
		secondary,
		info,
		success,
		warning,
		error,
		grey,
		brown,
		orange,
		red,
		common,
		divider: `rgba(145, 158, 171, 0.2)`,
		action: {
			...action,
			active: grey[500],
		},
		text: {
			primary: "#FFFFFF",
			secondary: grey[500],
			disabled: grey[600],
		},
		background: {
			paper: "#181a1b",
			default: "#121313",
			neutral: `rgba(145, 158, 171, 0.12)`,
			navs: "#181a1b",
		},
	};

	return mode === "light" ? light : dark;
};
