import { When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import PO_DateFilter from '../../../pageObject/Documents/PO_DateFilter';

const dateFilter = new PO_DateFilter();

When('The user enters a text into the to published box', () => {
	dateFilter.datePublishedLink();
	dateFilter.toDay().type('a');
	dateFilter.toMonth().type('b');
	dateFilter.toYear().type('c');
});
Then('The user is presented with a error message {string}', (errorMessage) => {
	dateFilter.toDateErrors().should('contain', errorMessage);
});
