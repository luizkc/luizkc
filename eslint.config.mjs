import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import prettier from "eslint-config-prettier";
import autofix from "eslint-plugin-autofix";
import importPlugin from "eslint-plugin-import";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";

const tsFiles = ["**/*.{ts,tsx}"];

const withTsFiles = (configs) =>
  configs.map((config) => ({
    ...config,
    files: config.files ?? tsFiles,
  }));

export default tseslint.config(
  {
    ignores: [
      ".context/**",
      ".next/**",
      "build/**",
      "next-env.d.ts",
      "node_modules/**",
      "out/**",
    ],
  },
  ...nextCoreWebVitals,
  ...withTsFiles(tseslint.configs.recommendedTypeChecked),
  ...withTsFiles(tseslint.configs.stylisticTypeChecked),
  prettier,
  {
    files: tsFiles,
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      autofix,
      import: importPlugin,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "import/newline-after-import": "error",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "autofix/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "no-console": "warn",
    },
  },
  {
    files: tsFiles,
    rules: {
      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],
      "@typescript-eslint/no-misused-promises": [
        2,
        {
          checksVoidReturn: { attributes: false },
        },
      ],
    },
  },
  {
    files: ["src/components/**/*.tsx"],
    rules: {
      "func-style": ["error", "declaration", { allowArrowFunctions: false }],
    },
  },
  {
    files: ["*.js", "*.jsx", "*.ts", "*.tsx"],
    rules: {
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^react", "^@?\\w"],
            ["^(@|components)(/.*|$)"],
            ["^\\u0000"],
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            ["^.+\\.?(css)$"],
          ],
        },
      ],
    },
  },
);
