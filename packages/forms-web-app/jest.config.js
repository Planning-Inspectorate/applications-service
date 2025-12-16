const sharedConfig = require('../../jest.config.js');

module.exports = {
	...sharedConfig,
	clearMocks: true,
	collectCoverageFrom: ['./src/**/*.js'],
	coveragePathIgnorePatterns: [
		'node_modules',
		'<rootDir>/src/app.js',
		'<rootDir>/src/server.js',
		'<rootDir>/src/assets',
		'<rootDir>/src/public',
		'<rootDir>/src/scripts',
		'<rootDir>/src/views/pins-components'
	],
	coverageThreshold: {
		global: {
			branches: 80,
			functions: 80,
			lines: 80,
			statements: 80
		}
	},
	setupFilesAfterEnv: ['./__tests__/setupTests.js'],
	setupFiles: ['<rootDir>/.jest/setEnvVars.js'],
	testPathIgnorePatterns: ['<rootDir>/dist/'],
	modulePathIgnorePatterns: ['<rootDir>/dist/']
};
