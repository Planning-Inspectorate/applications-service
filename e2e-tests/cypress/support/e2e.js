// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')
import 'cypress-axe';

// Global error handling for uncaught exceptions
Cypress.on('uncaught:exception', (err) => {
	// Prevent Cypress from failing tests on application errors
	// that don't affect test execution
	console.error('Uncaught exception:', err.message);
	// Return false to prevent the error from failing the test
	// Only for non-critical errors
	if (err.message.includes('ResizeObserver') || err.message.includes('Script error')) {
		return false;
	}
	// Let other errors fail the test
	return true;
});

// Add global before hook for stability
beforeEach(() => {
	// Ensure clean state
	cy.clearCookies();
	cy.clearLocalStorage();
});
