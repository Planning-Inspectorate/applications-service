import { When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import PO_DateFilter from '../../../pageObject/Documents/PO_DateFilter';
const dateFilter = new PO_DateFilter();

When('User enters only month and date into the to published box {string} {string}', (mm, dd) => {
	dateFilter.datePublishedLink();
	dateFilter.toDay().type(dd);
	dateFilter.toMonth().type(mm);
	dateFilter.applyFilterBtn();
});
And('User is displayed with an error message {string}', (errorMessage) => {
	dateFilter.toDateErrors().should('contain', errorMessage);
});
