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
		baseUrl: 'https://applications-service-test.planninginspectorate.gov.uk',
		experimentalRunAllSpecs: true,
		chromeWebSecurity: false,
		viewportHeight: 960,
		viewportWidth: 1536,
		defaultCommandTimeout: 10000,
		pageLoadTimeout: 10000,
		env: {
			commandDelay: 150
		}
	}
});
