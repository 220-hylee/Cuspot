module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'google',
    'plugin:node/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'no-restricted-globals': ['error', 'name', 'length'],
    'prefer-arrow-callback': 'error',
    'comma-dangle': ['error', 'always-multiline'],
    'max-len': ['error', { code: 80 }],
    'object-curly-spacing': ['error', 'always'],
    'eol-last': ['error', 'always'],
    quotes: ['error', 'single', { avoidEscape: true }],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
        printWidth: 80,
        tabWidth: 2,
        useTabs: false,
        semi: true,
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.spec.*'],
      env: {
        mocha: true,
      },
      rules: {},
    },
  ],
  globals: {},
};
