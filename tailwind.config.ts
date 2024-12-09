import type { Config } from "tailwindcss";

const config: Config = {
	content: ["./src/**/*.{ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#f6de00",
				secondary: "#f29100",
			},
		},
	},
};

export default config;
