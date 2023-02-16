///<reference types ="cypress" />
import { And, When } from 'cypress-cucumber-preprocessor/steps';
import PO_Documents from '../../../pageObject/Documents/PO_Documents';
const documents = new PO_Documents();

And('User expands the filter', () => {
	documents.showHideAllFilters();
});
When('The user clicks the  Selects all filters link within the Pre-application filter', () => {
	documents.selectAllFiters().eq(0).click();
});
And('The user clicks the  Selects all filters link within the Developers application stage', () => {
	documents.selectAllFiters().eq(1).click();
});
And('The user clicks the  Selects all filters link within the Acceptance stage', () => {
	documents.selectAllFiters().eq(2).click();
});
And('The user clicks the  Selects all filters link within the Pre-examination stage', () => {
	documents.selectAllFiters().eq(3).click();
});
And('The user clicks the  Selects all filters link within the Examination stage', () => {
	documents.selectAllFiters().eq(4).click();
});

And('The user clicks Apply filters', () => {
	documents.applyFilterButton();
});

Then('The Filtered results section  is displayed with the project stages', () => {
	documents.filterResultsCaption().eq(0).should('contain', 'Pre-application');
	documents.filterResultsCaption().eq(1).should('contain', "Developer's Application");
	documents.filterResultsCaption().eq(2).should('contain', 'Acceptance');
	documents.filterResultsCaption().eq(3).should('contain', 'Pre-examination');
	documents.filterResultsCaption().eq(4).should('contain', 'Examination');
});
