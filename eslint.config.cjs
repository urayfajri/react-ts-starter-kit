/* ESLint flat config with TypeScript support via @typescript-eslint
 * This config lints JavaScript and TypeScript files and sets up
 * recommended rules for React and TypeScript. Install the dev
 * dependencies listed below before running `npm run lint`.
 *
 * Dev dependencies to install locally:
 *
 * npm install -D @typescript-eslint/parser @typescript-eslint/eslint-plugin
 *
 */

module.exports = [
  // JS/JSX rules
  {
    files: ["**/*.{js,jsx,mjs,cjs}"],
    ignores: ["node_modules/**", "dist/**", "public/**"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
    },
    plugins: {
      react: require("eslint-plugin-react"),
      "react-hooks": require("eslint-plugin-react-hooks"),
    },
    rules: {
      // Minimal JS rules; rely on default/recommended behavior
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
    },
    settings: { react: { version: "detect" } },
  },

  // TypeScript files
  {
    files: ["**/*.{ts,tsx}"],
    ignores: ["node_modules/**", "dist/**", "public/**"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parser: require("@typescript-eslint/parser"),
      parserOptions: {
        project: "./tsconfig.eslint.json",
        tsconfigRootDir: __dirname,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
      react: require("eslint-plugin-react"),
      "react-hooks": require("eslint-plugin-react-hooks"),
    },
    rules: {
      // TypeScript recommended rules
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
    settings: { react: { version: "detect" } },
  },
];

