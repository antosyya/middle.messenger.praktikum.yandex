import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";

export default [
  js.configs.recommended,
  { ignores: ["node_modules/", "dist/", "build/", "**/*.min.js"] },
  {
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    files: ["**/*.{js,mjs,cjs,ts}"],
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      "@typescript-eslint/ban-ts-comment": "warn",
    },
  },
];
