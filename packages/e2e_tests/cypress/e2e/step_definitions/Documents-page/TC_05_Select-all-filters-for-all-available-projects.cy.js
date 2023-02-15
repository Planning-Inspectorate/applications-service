///<reference types ="cypress" />
import { And, When } from 'cypress-cucumber-preprocessor/steps';
import PO_Documents from '../../../pageObject/Documents/PO_Documents';
const documents = new PO_Documents();

And('User expands the filter', () => {
	documents.showAllFilterLink();
});
When('The user clicks the  Selects all filters link within the Pre-application filter', () => {});
And(
	'The user clicks the  Selects all filters link within the Developers application stage',
	() => {}
);
And('The user clicks the  Selects all filters link within the Acceptance stage', () => {});
And('The user clicks the  Selects all filters link within the Pre-examination stage', () => {});
And('The user clicks the  Selects all filters link within the Examination stage', () => {});

And('The user clicks Apply filters', () => {});

Then('The Filtered results section  is displayed with the project stages', () => {});
