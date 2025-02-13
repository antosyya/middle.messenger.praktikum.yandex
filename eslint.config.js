import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsp from "@typescript-eslint/parser";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,ts,cjs}"],
    languageOptions: {
      parser: tsp,
      globals: {
        window: "readonly",
        document: "readonly",
        process: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      "@typescript-eslint/ban-ts-comment": "warn",
    },
  },
];
