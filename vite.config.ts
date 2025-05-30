import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	plugins: [solid(), tailwindcss()],
	build: {
		rollupOptions: {
			output: {
				manualChunks: undefined,
			},
		},
	},
	server: {
		// For development - handle SPA routing
		fs: {
			strict: false,
		},
	},
	preview: {
		// This helps with SPA routing when using `npm run preview`
		cors: true,
		host: true,
	},
});
