module.exports = {
  extends: ['eslint-config-umi', 'prettier'],
  globals: { google: true },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'sort-vars': ['error', { ignoreCase: true }],
    'import/order': 'error',
    'no-unused-vars': 'error',
    'react/prop-types': 'error',
  },
};
