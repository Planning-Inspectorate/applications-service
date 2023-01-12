import { When, Then, And } from 'cypress-cucumber-preprocessor/steps';

import OrganisationNamePage from './PageObjects/OrganisationNamePage';
import PO_FullName from '../full-name/PageObjects/PO_FullName';
const fullNamePage = new PO_FullName();
const organisationNamePage = new OrganisationNamePage();

And('I have been asked for the name of my organisation or charity', () => {
	fullNamePage.enterTextIntoFullNameField('TestFirstName TestMiddleName TestLastName');
	cy.clickSaveAndContinue();
	cy.selectRadioYesOrNo('Yes');
	cy.clickSaveAndContinue();
	cy.assertUserOnThePage('what is the name of your organisation or charity?');
});

Then('below error message should be presented on full name page', function (table) {
	cy.assertErrorMessage(table);
});

And('I can see the text This service is only for Application service', () => {
	organisationNamePage.validateHeaderContent();
});

Then('I click on back link', () => {
	cy.clickOnBackLink();
});

Then('I am on the {string} page', (pageName) => {
	cy.assertUserOnThePage(pageName);
});

When('I continue with the value {string} in the organisation name field', (text) => {
	organisationNamePage.enterTextIntoOrganisationNameField(text);
	cy.clickSaveAndContinue();
});
