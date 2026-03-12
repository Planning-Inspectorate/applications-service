/// <reference types="@shelex/cypress-allure-plugin" />
// Import commands.js using ES2015 syntax:
import './commands';
import '@shelex/cypress-allure-plugin';
import { slowCypressDown } from 'cypress-slow-down';
slowCypressDown(); // slows down each command by 500ms
// Alternatively you can use CommonJS syntax:
// require('./commands')
require('@shelex/cypress-allure-plugin');

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
