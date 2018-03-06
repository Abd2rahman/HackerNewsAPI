module.exports = {
  extends: 'standard',
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  globals: {
    sails: true,
    User: true,
    Topic: true,
    Comment: true,
    TokenService: true,

  },
  parser: 'babel-eslint',
  rules: {
    'standard/no-callback-literal': 0,
    'prefer-const': 'error',
    'import/newline-after-import': ['error', { 'count': 1 }],
    'object-curly-spacing': [2, 'always'],
    'brace-style': ['error', '1tbs', { 'allowSingleLine': true } ]
  }
};
