///<reference types ="cypress" />
import { And, When } from 'cypress-cucumber-preprocessor/steps';
import PO_Documents from '../../../pageObject/Documents/PO_Documents';
const documents = new PO_Documents();

When('The user selects 1 document type checkbox within the Pre-application stage', () => {
	documents.showAllFilterLink();
	documents.preAppFilterCheckBox_1();
});
And('The user selects 1 document type checkbox within the Acceptance stage', () => {
	documents.acceptanceCheckBox_1();
});
And('The user selects 1 document type checkbox within the Pre-examination stage', () => {
	documents.preExamCheckBox_1();
});
And('The user selects 1 document type checkbox within the Examination stage', () => {
	documents.examCheckBox_1();
});
And('User clicks Apply filters', () => {
	documents.applyFilterButton();
});

And('Filtered results section is displayed with the project stages', function () {
	cy.get(':nth-child(1) > :nth-child(1) > .ui-tag-link-list__caption').should(
		'be.visible',
		'Pre-application'
	);
	cy.get(':nth-child(2) > :nth-child(1) > .ui-tag-link-list__caption').should(
		'be.visible',
		'Acceptance'
	);
	cy.get(':nth-child(3) > :nth-child(1) > .ui-tag-link-list__caption').should(
		'be.visible',
		'Pre-examination'
	);
	cy.get(':nth-child(4) > :nth-child(1) > .ui-tag-link-list__caption').should(
		'be.visible',
		'Examination'
	);
});

And('The document types are displayed against the project stages', () => {
	Cypress._.times(60, () => {
		documents.documentsVisible().should('be.visible'); //  Document are displayed
	});
});
