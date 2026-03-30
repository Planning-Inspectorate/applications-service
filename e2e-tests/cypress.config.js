const { defineConfig } = require('cypress');
const cucumber = require('cypress-cucumber-preprocessor').default;

module.exports = defineConfig({
	chromeWebSecurity: false,
	viewportWidth: 1024,
	viewportHeight: 1600,
	video: false,
	env: {
		demoDelay: 0,
		APP_APPLICATION_BASE_URL: 'http://forms-web-app:9004',
		TAGS: 'not (@wip or @ignore)'
	},
	projectId: 'ud8v53',
	e2e: {
		setupNodeEvents(on) {
			on('file:preprocessor', cucumber());
		},
		baseUrl: 'http://localhost:9004',
		specPattern: 'cypress/e2e/**/*.feature'
	}
});
