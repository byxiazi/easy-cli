module.exports = {
  root: true,
  parser: require.resolve('babel-eslint'),
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  extends: ['eslint:recommended'],
  globals: {},
  rules: {
    'no-console': process.env.NODE_ENV !== 'production' ? 0 : 2,
    'no-useless-escape': 0,
    'no-empty': 0,
  },
}
