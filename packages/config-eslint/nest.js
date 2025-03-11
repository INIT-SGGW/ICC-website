const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project
    },
    extends: [
        ...["@vercel/style-guide/eslint/node",
            "@vercel/style-guide/eslint/typescript"].map(require.resolve),
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended', // Prettier integration
    ],
    plugins: ['prettier'],
    globals: {
        ...require('globals').node,
        ...require('globals').jest,
    },
    env: {
        node: true,
        jest: true,
    },
    rules: {
        '@typescript-eslint/no-floating-promises': 'warn',
        '@typescript-eslint/no-unsafe-argument': 'warn',
        "@typescript-eslint/no-extraneous-class": 'off',
        "unicorn/filename-case": 'off',
    },
    ignorePatterns: ['eslint.config.mjs'], // Ignores this file from linting
};
