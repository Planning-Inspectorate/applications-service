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
		specPattern: 'cypress/e2e/**/*.cy.js',
		excludeSpecPattern: ['cypress/e2e/features/**', 'cypress/e2e/step_definitions/**'],
		experimentalRunAllSpecs: true,
		chromeWebSecurity: false,
		pageLoadTimeout: 90000,
		defaultCommandTimeout: 30000,
		requestTimeout: 30000,
		responseTimeout: 60000,
		testIsolation: false,
		experimentalMemoryManagement: true,
		numTestsKeptInMemory: 1,
		retries: {
			runMode: 2,
			openMode: 0
		},
		env: {
			commandDelay: 0,
			baseUrl: 'https://applications-service-test.planninginspectorate.gov.uk'
		},
		viewportWidth: 1920,
		viewportHeight: 2000
	}
});
