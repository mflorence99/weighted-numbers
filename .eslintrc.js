module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2019, 
    sourceType: 'module' 
  }, 
  extends: [
    'plugin:@typescript-eslint/recommended'
  ],
  rules: { 
    '@typescript-eslint/no-empty-function': 'off',
    quotes: ['error', 'single'],
    semi: ['error', 'always']
  }
};
