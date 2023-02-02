///<reference types ="cypress" />
import { And, When } from 'cypress-cucumber-preprocessor/steps';
import PO_Documents from '../../../pageObject/Documents/PO_Documents';
const documents = new PO_Documents();

And('User expands the filter', () => {
	documents.showAllFilterLink();
});
When('The user clicks the  Selects all filters link within the Pre-application filter', () => {
	cy.get(
		'#ui-checkbox-accordion__checkboxes-section--stage-1 > .ui-checkbox-accordion__checkboxes-section-switch'
	).click();
});
And('The user clicks the  Selects all filters link within the Developers application stage', () => {
	cy.get('.ui-checkbox-accordion__checkboxes-section-switch').eq('1').click();
});
And('The user clicks the  Selects all filters link within the Acceptance stage', () => {
	cy.get('.ui-checkbox-accordion__checkboxes-section-switch').eq('2').click();
});
And('The user clicks the  Selects all filters link within the Pre-examination stage', () => {
	cy.get('.ui-checkbox-accordion__checkboxes-section-switch').eq('3').click();
});
And('The user clicks the  Selects all filters link within the Examination stage', () => {
	cy.get('.ui-checkbox-accordion__checkboxes-section-switch').eq('4').click();
});

And('The user clicks Apply filters', () => {
	documents.applyFilterButton();
});

Then('The Filtered results section  is displayed with the project stages', () => {
	cy.get(':nth-child(1) > :nth-child(1) > .ui-tag-link-list__caption').should(
		'be.visible',
		'Pre-application'
	);
	cy.get(':nth-child(2) > :nth-child(1) > .ui-tag-link-list__caption').should(
		'be.visible',
		'Developers Application'
	);
	cy.get(':nth-child(3) > :nth-child(1) > .ui-tag-link-list__caption').should(
		'be.visible',
		'Acceptance'
	);
	cy.get(':nth-child(4) > :nth-child(1) > .ui-tag-link-list__caption').should(
		'be.visible',
		'Pre-examination'
	);
	cy.get(':nth-child(5) > :nth-child(1) > .ui-tag-link-list__caption').should(
		'be.visible',
		'Examination'
	);
});
