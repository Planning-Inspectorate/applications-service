import { When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import PO_FullName from './PageObjects/PO_FullName';
const fullNamePage = new PO_FullName();

Then('below error message should be presented on full name page', function (table) {
	cy.assertErrorMessage(table);
});

And('I can see the logo gov uk text', () => {
	fullNamePage.validateHeaderLogo();
});

And('I can see the text This service is only for Application service', () => {
	fullNamePage.validateHeaderContent();
});

Then('I click on back link', () => {
	cy.clickOnBackLink();
});

Then('I am on the {string} page', (pageName) => {
	cy.assertUserOnThePage(pageName);
});

When('I continue with the value {string} in the full name field', (text) => {
	fullNamePage.enterTextIntoFullNameField(text);
	cy.clickSaveAndContinue();
});
