import { When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import PO_DateFilter from '../../../pageObject/Documents/PO_DateFilter';
const dateFilter = new PO_DateFilter();

When('The user enters a date in the - From filter {string} {string} {string}', (dd, mm, yyyy) => {
	dateFilter.datePublishedLink();
	dateFilter.fromDay().type(dd);
	dateFilter.fromMonth().type(mm);
	dateFilter.fromYear().type(yyyy);
});
And('The user enters a date in the - To filter {string} {string} {string}', (dd, mm, yyyy) => {
	dateFilter.toDay().type(dd);
	dateFilter.toMonth().type(mm);
	dateFilter.toYear().type(yyyy);
});
And('Users clicks apply filter', () => {
	dateFilter.applyFilterBtn();
});
Then('The user is presented with an error {string}', (errorMessage) => {
	dateFilter.fromDateErrors().should('contains', errorMessage);
});
