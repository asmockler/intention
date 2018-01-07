module.exports = {
  env: {
    browser: true,
    es6: true,
  },

  extends: ['eslint:recommended', 'prettier'],
  plugins: ['typescript', 'react', 'prettier', 'graphql'],

  parser: 'typescript-eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    sourceType: 'module',
  },

  rules: {
    'no-undef': 0,
    'no-unused-vars': 2,
    'typescript/no-unused-vars': 2,
    'react/jsx-uses-vars': 2,
    'react/jsx-uses-react': 2,
    'react/react-in-jsx-scope': 2,
    'prettier/prettier': [
      'error',
      {
        arrowParens: 'always',
        bracketSpacing: false,
        parser: 'typescript',
        singleQuote: true,
        trailingComma: 'es5',
      },
    ],
    'graphql/template-strings': [
      'error',
      {
        env: 'apollo',
        schemaJson: require('./schema.json'),
      },
    ],
  },
};
