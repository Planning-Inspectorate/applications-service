const { defineConfig } = require('cypress');
const cucumber = require('cypress-cucumber-preprocessor').default;
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
	e2e: {
		setupNodeEvents(on, config) {
			on('file:preprocessor', cucumber());
			allureWriter(on, config);
			return config;
		},

		specPattern: 'cypress/e2e/**/*.feature',
		baseUrl: 'http://localhost:9004',
		experimentalRunAllSpecs: true,
		chromeWebSecurity: false,
		pageLoadTimeout: 20000,
		env: {
			commandDelay: 300
		}
	}
});
