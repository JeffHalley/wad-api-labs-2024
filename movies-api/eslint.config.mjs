import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      globals: globals.node,
      ecmaVersion: 2021, // Supports async/await and modern JavaScript (ES12)
      sourceType: "module", // Use module format
    },
    rules: {
      "semi": 1,
      "no-console": "off",
    },
  },
  pluginJs.configs.recommended,
];