import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	server: { port: 3300 },
	plugins: [react(), tsconfigPaths()],
	build: {
		rollupOptions: {
			input: "src/Production/index.ts",
			output: {
				entryFileNames: "editor-toolbar.js",
				format: "es",
			},
			preserveEntrySignatures: "exports-only",
		},
	},
});
