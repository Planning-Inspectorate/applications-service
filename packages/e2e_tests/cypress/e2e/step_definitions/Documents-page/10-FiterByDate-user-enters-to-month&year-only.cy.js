///<reference types ="cypress" />
import { When, Then } from 'cypress-cucumber-preprocessor/steps';
import PO_DateFilter from '../../../pageObject/Documents/PO_DateFilter';
const dateFilter = new PO_DateFilter();

When(
	'The user completes only to month and year {string} {string} into the published box',
	(mm, yyyy) => {
		dateFilter.datePublishedLink();
		dateFilter.toMonth().type(mm);
		dateFilter.toYear().type(yyyy);
		dateFilter.applyFilterBtn();
	}
);

Then('The user is presented with a error {string}', (errormessage) => {
	dateFilter.toDateErrors().should('be.visible', errormessage);
});
