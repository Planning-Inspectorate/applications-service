import { When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import PO_DateFilter from '../../../pageObject/Documents/PO_DateFilter';
const dateFilter = new PO_DateFilter();

When('The user enters a text into the from published box', () => {
	dateFilter.datePublishedLink();
	dateFilter.fromDay().type('a');
	dateFilter.fromMonth().type('b');
	dateFilter.fromYear().type('c');
});

And('Users clicks apply filter', () => {
	dateFilter.applyFilterBtn();
});

Then('The user is presented with an error message {string}', (errorMessage) => {
	cy.get('#docments-page-date-from-form-group-error').should('contain', errorMessage);
});
