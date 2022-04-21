module.exports = {
  plugins: ['stylelint-scss', 'stylelint-order'],
  extends: [
    'stylelint-config-standard',
    // 'stylelint-prettier/recommended',
  ],
  rules: {
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'string-quotes': 'single',
    'order/properties-alphabetical-order': true,
  },
  ignoreFiles: ['**/node_modules/**'],
};
