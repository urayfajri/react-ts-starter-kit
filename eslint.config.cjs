/**
 * ESLint flat config — TypeScript, React, jsx-a11y (warnings), Prettier-compatible.
 */

const jsxA11yPlugin = require("eslint-plugin-jsx-a11y");

function jsxRulesAsWarn(ruleMap) {
  const out = {};
  for (const [key, value] of Object.entries(ruleMap)) {
    if (value === "off") {
      out[key] = "off";
      continue;
    }
    if (Array.isArray(value)) {
      out[key] = ["warn", ...value.slice(1)];
      continue;
    }
    out[key] = "warn";
  }
  return out;
}

const jsxA11yWarnRules = jsxRulesAsWarn(jsxA11yPlugin.flatConfigs.recommended.rules);

module.exports = [
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "public/**",
      "coverage/**",
      "**/coverage/**",
      "e2e/**",
      "test-results/**",
      "playwright-report/**",
    ],
  },

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
      "jsx-a11y": jsxA11yPlugin,
    },
    rules: {
      // Minimal JS rules; rely on default/recommended behavior
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",

      ...jsxA11yWarnRules,
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
      "jsx-a11y": jsxA11yPlugin,
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

      ...jsxA11yWarnRules,
    },
    settings: { react: { version: "detect" } },
  },

  /** Turn off ESLint stylistic rules that conflict with Prettier */
  require("eslint-config-prettier"),
];

