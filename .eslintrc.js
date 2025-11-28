module.exports = {
	env: {
		es2021: true,
		jest: true,
		node: true,
		browser: true
	},
	extends: ['eslint:recommended', 'prettier'],
	ignorePatterns: [
		'node_modules/**',
		'dist/**',
		'webpack.**',
		'*.script.js',
		'packages/applications-service-api/prisma/client/**/*.js',
		'packages/back-office-subscribers/lib/prisma-client/**/*.js'
	],
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module'
	},
	plugins: ['jest'],
	root: true
};
