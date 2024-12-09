import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	server: { port: 3300 },
	plugins: [react(), tsconfigPaths()],
	build: {
		lib: {
			entry: "src/Product/index.ts",
			name: "editor-toolbar",
			fileName: () => "editor-toolbar.js",
			formats: ["es"],
		},
		rollupOptions: {
			// Externalize dependencies that shouldn't be bundled in the library
			external: ["react", "react-dom"],
			output: {
				globals: {
					react: "React",
					"react-dom": "ReactDOM",
				},
			},
		},
	},
});
