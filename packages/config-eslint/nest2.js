const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project
    },
    plugins: ['@typescript-eslint/eslint-plugin'],
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    settings: {
        "import/resolver": {
            typescript: {
                project,
            },
            node: {
                extensions: [".mjs", ".js", ".jsx", ".ts", ".tsx"],
            },
        },
    },
    ignorePatterns: ["node_modules/", "dist/"],
    env: {
        node: true,
        jest: true,
    },
    rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        "@typescript-eslint/no-extraneous-class": "off",
    },
};