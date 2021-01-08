module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  rules: {
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    'no-underscore-dangle': 0,
    '@typescript-eslint/consistent-type-definitions': 0,
    'consistent-return': 0,
    '@typescript-eslint/consistent-type-imports': 0,
    '@typescript-eslint/no-shadow': 0,
    'no-template-curly-in-string': 0,
    'prefer-promise-reject-errors': 0,
    'no-lonely-if': 0,
    'no-console': 0,
  },
};
