///<reference types ="cypress" />
import { And, When } from 'cypress-cucumber-preprocessor/steps';
import PO_Documents from '../../../pageObject/Documents/PO_Documents';
const documents = new PO_Documents();

And('User selects the Pre-application stage Filter', () => {
	documents.filterTitleLink().eq(0).click();
});

When('User selects 2 document type checkbox within the Pre-application filter', () => {
	cy.get('#stage-1').click();
	cy.get('#stage-1-2').click();
});
And('User clicks Apply filters', () => {
	documents.applyFilterButton();
});

And('A Filtered results section is displayed with the project stage Pre-application', function () {
	documents.filterResultsCaption().should('contain', 'Pre-application');
});
And('The document type is displayed against the project stage', () => {
	documents.documentsListVisible().should('be.visible');
});
