///<reference types ="cypress" />
import { And, When } from 'cypress-cucumber-preprocessor/steps';
import PO_Documents from '../../../pageObject/Documents/PO_Documents';
const documents = new PO_Documents();

And('User selects the Pre-application stage Filter', () => {
	documents.preAppFilter();
});

When('User selects 1 document type checkbox within the Pre-application filter', () => {
	documents.preAppFilterCheckBox_1();
});
And('User clicks Apply filters', () => {
	documents.applyFilterButton();
});

And('A Filtered results section is displayed with the project stage Pre-application', function () {
	Cypress._.times(6, () => {
		documents.preAppFilteText().should('be.visible', 'Pre-application'); // 6 applicaion types are shown
	});
});
And('The document type is displayed against the project stage', () => {
	Cypress._.times(6, () => {
		documents.documentsVisible().should('be.visible'); // 6 Document are displayed
	});
});
