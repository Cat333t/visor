import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import json from "@eslint/json";
import css from "@eslint/css";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { ignores: ["dist/**", "node_modules/**", "package-lock.json"] },
  { files: ["**/*.{js,mjs,cjs,jsx}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: {...globals.browser, ...globals.node} } },
  { files: ["**/*.js"], languageOptions: { sourceType: "script" } },
  { files: ["vite.config.js"], languageOptions: { sourceType: "module" } },
  { 
    files: ["**/*.{jsx,js}"],
    ...pluginReact.configs.flat.recommended,
    settings: {
      react: {
        version: "detect"
      }
    }
  },
  { 
    files: ["**/*.json"], 
    plugins: { json }, 
    language: "json/json", 
    extends: ["json/recommended"] 
  },
  {
    files: ["**/*.css"],
    plugins: { css },
    language: "css/css",
    extends: ["css/recommended"],
    rules: {
      "css/no-invalid-properties": "off",
      "css/use-baseline": "warn",
    },
  },
]);
