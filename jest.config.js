module.exports = {
	coverageDirectory: '<rootDir>/jest-reports/coverage',
	coverageReporters: ['cobertura', 'json', 'html', 'text', 'text-summary'],
	moduleFileExtensions: ['js', 'json'],
	reporters: ['default', ['jest-junit', { outputDirectory: '<rootDir>/jest-reports' }]],
	testEnvironment: 'node',
	testMatch: ['**/?(*.)+(spec|test).js']
};
