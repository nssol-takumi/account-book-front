module.exports = {
  root: true,
  env: {
    browser: true,
    jest: true,
    node: true,
  },
  extends: ['plugin:prettier/recommended', 'prettier', '@vue/typescript/recommended'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
  },
  rules: {
    complexity: ['error', 4],
    'default-case': 'error',
    'import/order': 'off',
    'max-depth': ['error', 3],
    'max-nested-callbacks': ['error', 3],
    'max-lines': ['error', 300],
    'no-console': 'error',
    'no-param-reassign': 'error',
    'object-shorthand': [
      'error',
      'always',
      {
        ignoreConstructors: false,
        avoidQuotes: true,
      },
    ],
    'prefer-template': 'error',
    'vue/one-component-per-file': 'off',
  },
  plugins: ['prettier'],
};
