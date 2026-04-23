import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import pluginVue from "eslint-plugin-vue";
import globals from "globals";

export default [
  {
    ignores: [".nuxt/**", ".output/**", "node_modules/**", "dist/**", "coverage/**"],
  },
  js.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  {
    files: ["**/*.{js,mjs,cjs,ts,vue}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "off",
      "no-prototype-builtins": "off",
    },
  },
  {
    files: ["**/*.vue"],
    rules: {
      "vue/multi-word-component-names": "off",
      "vue/valid-define-emits": "off",
      "vue/no-dupe-keys": "off",
      "vue/no-v-html": "off",
      "vue/require-v-for-key": "off",
      "vue/html-indent": "off",
      "vue/max-attributes-per-line": "off",
      "vue/singleline-html-element-content-newline": "off",
      "vue/multiline-html-element-content-newline": "off",
      "vue/html-self-closing": "off",
      "vue/attributes-order": "off",
      "vue/first-attribute-linebreak": "off",
      "vue/html-closing-bracket-newline": "off",
      "vue/require-default-prop": "off",
      "vue/attribute-hyphenation": ["warn", "always", {
        ignore: ["defaultConfig", "hideLines"],
      }],
      "vue/v-on-event-hyphenation": ["warn", "always", {
        ignore: ["onCreated", "getCode"],
      }],
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
];
