import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import PO_FullName from './PageObjects/PO_FullName';
const fullNamePage = new PO_FullName();

Given('I navigate to what is your full name page selecting {string}', (radiochoice) => {
	cy.visit('/project-search', { failOnStatusCode: false });
	cy.clickProjectLink('North Lincolnshire Green Energy Park');
	cy.clickOnHref('/register-have-your-say');
	cy.clickOnHref('who-registering-for');
	cy.selectRadioOption(radiochoice);
	cy.clickSaveAndContinue();
});

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
