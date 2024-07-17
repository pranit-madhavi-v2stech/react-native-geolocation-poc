module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['babel.config.js', 'metro.config.js', '.eslintrc.js'],
  plugins: ['@typescript-eslint'],
  extends: ['@react-native', 'plugin:@typescript-eslint/recommended'],
  rules: {
    // eslint
    'prettier/prettier': ['warn'],
  }
};
