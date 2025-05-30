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
	preview: {
		// This helps with SPA routing when using `npm run preview`
		cors: true,
		host: true,
	},
});
