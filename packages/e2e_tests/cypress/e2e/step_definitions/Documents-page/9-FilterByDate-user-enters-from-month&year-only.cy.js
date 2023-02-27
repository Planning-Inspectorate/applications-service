///<reference types ="cypress" />
import { When, Then } from 'cypress-cucumber-preprocessor/steps';
import PO_DateFilter from '../../../pageObject/Documents/PO_DateFilter';
const dateFilter = new PO_DateFilter();

When(
	'The user completes only from month and year {string} {string} into the published box',
	(mm, yyyy) => {
		dateFilter.datePublishedLink();
		dateFilter.fromMonth().type(mm);
		dateFilter.fromYear().type(yyyy);
		dateFilter.applyFilterBtn();
	}
);
And('Clicks Apply filter', () => {
	dateFilter.applyFilterBtn();
});

Then('The user is presented with an error {string}', (errormessage) => {
	dateFilter.fromDateErrors().should('be.visible', errormessage);
});
