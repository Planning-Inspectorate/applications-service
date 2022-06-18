import { When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import PO_FullName from '../full-name/PageObjects/PO_FullName';
import PO_OrgYouWorkFor from './PageObjects/PO_OrgYouWorkFor';
const fullNamePage = new PO_FullName();
const orgYouWorkFor = new PO_OrgYouWorkFor();

And('I have been asked what is the name of the organisation you work for', () => {
  fullNamePage.enterTextIntoFullNameField('TestFirstName TestMiddleName TestLastName');
  cy.clickSaveAndContinue();
});

When('I continue with the value {string} in the organisation name field', (text) => {
  orgYouWorkFor.enterTextIntoOrgNameField(text);
  cy.clickSaveAndContinue();
});

Then('I click on back link', () => {
  cy.clickOnBackLink();
});

Then('I am on the {string} page', (pageName) => {
  cy.assertUserOnThePage(pageName);
});
