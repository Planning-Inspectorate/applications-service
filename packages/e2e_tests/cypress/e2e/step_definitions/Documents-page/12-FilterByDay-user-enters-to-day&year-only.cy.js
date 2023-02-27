///<reference types ="cypress" />
import { When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import PO_DateFilter from '../../../pageObject/Documents/PO_DateFilter';
const dateFilter = new PO_DateFilter();

When(
	'The user completes only to day and year {string} {string} into the published box',
	(dd, yyyy) => {
		dateFilter.datePublishedLink();
		dateFilter.toDay().type(dd);
		dateFilter.toYear().type(yyyy);
		dateFilter.applyFilterBtn();
	}
);
And('Clicks Apply filter', () => {
	dateFilter.applyFilterBtn();
});
And('The user is presented with an error message', () => {
	dateFilter.toDateErrors().should('contain', 'The to date must include month');
});
