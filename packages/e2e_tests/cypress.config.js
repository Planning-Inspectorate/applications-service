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
		pageLoadTimeout: 20000,
		defaultCommandTimeout: 20000,
		testIsolation: false,
		env: {
			commandDelay: 0,
			baseUrl: 'https://applications-service-test.planninginspectorate.gov.uk'
		},
		viewportWidth: 1920,
		viewportHeight: 2000
	}
});
