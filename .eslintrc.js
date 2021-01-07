module.exports = {
  plugins: ['react-hooks'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: './tsconfig.json',
    createDefaultProgram: true,
  },
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  rules: {
    'react-hooks/rules-of-hooks': 'error', // 检查 Hook 的规则
    'react-hooks/exhaustive-deps': 'error', // 检查 effect 的依赖
    'import/no-unresolved': 0,
    'no-underscore-dangle': 0,
    'import/no-extraneous-dependencies': 0,
    'global-require': 0,
    'import/no-dynamic-require': 0,
    'react/sort-comp': 0,
    'jsx-a11y/aria-role': 0,
    'no-void': 0,
    'no-param-reassign': 0,
    'no-control-regex': 0,
    'no-plusplus': 0,
    'consistent-return': 0,
    'no-template-curly-in-string': 0,
    'prefer-promise-reject-errors': 0,
    'no-lonely-if': 0,
    'no-shadow': 0,
    'no-console': 0,
    '@typescript-eslint/naming-convention': 0,
  },
};
