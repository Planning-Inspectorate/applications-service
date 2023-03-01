///<reference types ="cypress" />
import { And, When } from 'cypress-cucumber-preprocessor/steps';
import PO_Documents from '../../../pageObject/Documents/PO_Documents';
const documents = new PO_Documents();

When('The user selects 1 document type checkbox within the Pre-application stage', () => {
	documents.showHideAllFilters();
	documents.sectionCheckBoxes().eq(0).click();
});
And('The user selects 1 document type checkbox within the Acceptance stage', () => {
	documents.sectionCheckBoxes().eq(1).click();
});
And('The user selects 1 document type checkbox within the Pre-examination stage', () => {
	documents.sectionCheckBoxes().eq(12).click();
});
And('The user selects 1 document type checkbox within the Examination stage', () => {
	documents.sectionCheckBoxes().eq(23).click();
});
And('User clicks Apply filters', () => {
	documents.applyFilterButton();
});
And('Filtered results section is displayed with the project stages', () => {
	documents.filterResultsCaption().eq(0).should('contain', 'Pre-application');
	documents.filterResultsCaption().eq(1).should('contain', 'Acceptance');
	documents.filterResultsCaption().eq(2).should('contain', 'Pre-examination');
});
