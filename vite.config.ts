import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	server: { port: 3300 },
	plugins: [
		react(),
		tailwindcss(),
		tsconfigPaths(),
		dts({ entryRoot: "src/Production", outDir: "dist" }),
	],
	build: {
		outDir: "dist",
		lib: {
			entry: "src/Production",
			fileName: "index",
			formats: ["es"],
		},
	},
});
