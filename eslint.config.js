// @ts-check

import pluginCspell from "@cspell/eslint-plugin/configs";
import pluginImportX from "eslint-plugin-import-x";
import pluginSonarjs from "eslint-plugin-sonarjs";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["node_modules", "dist", "build", "out"] },
  { files: ["**/*.{ts,tsx}"] },
  { plugins: { "@typescript-eslint": tseslint.plugin } },
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: { tsconfigRootDir: import.meta.dirname, project: "./tsconfig.eslint.json" },
      globals: { ...globals.browser, ...globals.node },
    },
  },
  pluginCspell.recommended,
  pluginImportX.flatConfigs.recommended,
  pluginImportX.flatConfigs.typescript,
  pluginSonarjs.configs.recommended,
  {
    rules: {
      "object-shorthand": ["error", "never"],

      "@typescript-eslint/consistent-type-imports": "error",

      "import-x/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: false },
        },
      ],
      "import-x/no-named-as-default-member": "off",
    },
  },
);
