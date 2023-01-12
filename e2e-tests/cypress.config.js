const { defineConfig } = require('cypress')
const cucumber = require('cypress-cucumber-preprocessor').default

module.exports = (on, config) => {
  on('file:preprocessor', cucumber())
}

module.exports = defineConfig({
  chromeWebSecurity: false,
  viewportWidth: 1024,
  viewportHeight: 1600,
  video: false,
  env: {
    demoDelay: 0,
    APP_APPLICATION_BASE_URL: 'http://forms-web-app:9004',
    TAGS: 'not (@wip or @ignore)',
  },
  projectId: 'ud8v53',
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'http://localhost:9004',
    specPattern: 'cypress/e2e/**/*.feature',
  },
})
