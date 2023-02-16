import { When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import PO_DateFilter from '../../../pageObject/Documents/PO_DateFilter';
const dateFilter = new PO_DateFilter();

When('User enters only month and date into the from published box {string} {string}', (mm, dd) => {
	dateFilter.datePublishedLink();
	dateFilter.fromMonth().type(mm);
	dateFilter.fromDay().type(dd);
	dateFilter.applyFilterBtn();
});
And('User is displayed an error message {string}', (errorMessage) => {
	dateFilter.fromDateErrors().should('contain', errorMessage);
});
