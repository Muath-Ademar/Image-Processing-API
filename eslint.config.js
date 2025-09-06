const pluginPrettier = require('eslint-plugin-prettier');
const js = require('@eslint/js');
const { FlatCompat } = require('@eslint/eslintrc');
const globals = require('globals');

const compat = new FlatCompat({
  baseDirectory: __dirname
});

module.exports = [
  js.configs.recommended,
  ...compat.extends('plugin:prettier/recommended'),

  {
    plugins: {
      prettier: pluginPrettier
    },
    rules: {
      'prettier/prettier': 2,
      'no-use-before-define': ['error', { functions: true, classes: true }],
      'no-var': 'error',
      'prefer-const': 'error',
    },
    languageOptions: {
      ecmaVersion: 2017,

      globals: {
        ...globals.node,
        ...globals.es2021
      }
    },
  }
];
