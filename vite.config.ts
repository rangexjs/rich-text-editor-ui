import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	server: { port: 3300 },
	plugins: [react(), tailwindcss(), tsconfigPaths()],
	build: {
		outDir: "dist",
		lib: {
			entry: "src/Production/index.ts",
			fileName: "index",
			formats: ["es"],
		},
	},
});
