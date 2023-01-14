import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: [
			{ find: "@src", replacement: path.resolve(__dirname, "src") },
			{
				find: "@components",
				replacement: path.resolve(__dirname, "src/components"),
			},
			{
				find: "@hooks",
				replacement: path.resolve(__dirname, "src/hooks"),
			},
			{
				find: "@types",
				replacement: path.resolve(__dirname, "src/types"),
			},
			{
				find: "@utils",
				replacement: path.resolve(__dirname, "src/utils"),
			},
			{
				find: "@cores",
				replacement: path.resolve(__dirname, "src/cores"),
			},
			{
				find: "@contexts",
				replacement: path.resolve(__dirname, "src/contexts"),
			},
			{
				find: "@icons",
				replacement: path.resolve(__dirname, "src/icons"),
			},
			{
				find: "@themes",
				replacement: path.resolve(__dirname, "src/themes"),
			},
		],
	},
	server: {
		port: 3000,
	},
	preview: {
		port: 3000,
	},
});
