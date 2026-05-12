module.exports = {
	extends: ['plugin:cypress/recommended', 'prettier'],
	plugins: ['cypress'],
	parserOptions: {
		ecmaVersion: 2022,
		sourceType: 'module'
	}
};
