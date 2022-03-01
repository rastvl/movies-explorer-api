module.exports = {
  extends: [
    'airbnb-base',
  ],
  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'import/extensions': ['error', 'ignorePackages'],
  },
};
