const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended', // Prettier integration
    ],
    plugins: ['@typescript-eslint', 'prettier'],
    globals: {
        ...require('globals').node,
        ...require('globals').jest,
    },
    env: {
        node: true,
        jest: true,
    },
    rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-floating-promises': 'warn',
        '@typescript-eslint/no-unsafe-argument': 'warn',
    },
    ignorePatterns: ['eslint.config.mjs'], // Ignores this file from linting
};
