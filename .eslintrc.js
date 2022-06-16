module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "jest": true,
    "node": true
  },
  "extends": [
    "prettier",
    "eslint:recommended"
  ],
  "ignorePatterns": [
    "node_modules/**",
    "src/public/javascript/**",
    "dist/**", "webpack.**"
  ],
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module"
  },
  "plugins": ["jest"],
  "root": true,
  "rules": {
    "prettier/prettier": "error"
  }
};
