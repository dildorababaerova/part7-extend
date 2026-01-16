import globals from "globals";
import { defineConfig } from "eslint/config";
import stylisticJs from "@stylistic/eslint-plugin";
import js from "@eslint/js";

export default defineConfig([
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: { ...globals.node },
      ecmaVersion: "latest",
    },
  },
  {
    ignores: ["dist/**"],
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: {
      "@stylistic/js": stylisticJs,
    },
    rules: {
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
      eqeqeq: "error",
      "no-console": "off",
    },
  },
]);
