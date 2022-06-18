import { When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import PO_FullName from '../full-name/PageObjects/PO_FullName';
import PO_OrgYouWorkFor from '../what-is-the-name-of-org-you-work-for/PageObjects/PO_OrgYouWorkFor';
import PO_EmailAddress from './PageObjects/PO_EmailAddress';
const fullNamePage = new PO_FullName();
const orgYouWorkFor = new PO_OrgYouWorkFor();
const emailAddress = new PO_EmailAddress();

And('I have been asked what is your email address', () => {
  fullNamePage.enterTextIntoFullNameField('TestFirstName TestMiddleName TestLastName');
  cy.clickSaveAndContinue();
  orgYouWorkFor.enterTextIntoOrgNameField('Test Organisation Name');
  cy.clickSaveAndContinue();
});

When('I continue with the value {string} in the email address field', (text) => {
  emailAddress.enterTextIntoEmailField(text);
  cy.clickSaveAndContinue();
});

Then('I click on back link', () => {
  cy.clickOnBackLink();
});

Then('I am on the {string} page', (pageName) => {
  cy.assertUserOnThePage(pageName);
});
