const path = require('path')

module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es6: true,
    'jest/globals': true,
    node: true
  },
  plugins: [
    'react',
    'jest',
    'prettier',
    'import',
    'react-hooks',
    'compat',
    '@typescript-eslint'
  ],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/warnings',
    'plugin:import/errors',
    'plugin:jest/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/react',
    'prettier/@typescript-eslint'
  ],
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname
  },
  rules: {
    'linebreak-style': ['error', 'unix'],
    'no-console': 'off',
    'react/no-unescaped-entities': 0,
    'react/self-closing-comp': 1,
    radix: 1,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'compat/compat': 'error',
    'react/prop-types': 'off',
    '@typescript-eslint/prefer-interface': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-use-before-define': ['error', {functions: false}]
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect'
    },
    polyfills: [],
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      },
      alias: {
        map: [
          ['@components', path.resolve(__dirname, 'components')],
          ['@hooks', path.resolve(__dirname, 'hooks')],
          ['@lib', path.resolve(__dirname, 'lib')],
          ['@pages', path.resolve(__dirname, 'pages')]
        ],
        extensions: ['.ts', '.js', '.tsx', '.jsx', '.json']
      }
    }
  }
}
