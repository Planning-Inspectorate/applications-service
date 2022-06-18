import { When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import PO_FullName from '../full-name/PageObjects/PO_FullName';
import PO_OrgYouWorkFor from '../what-is-the-name-of-org-you-work-for/PageObjects/PO_OrgYouWorkFor';
import PO_EmailAddress from '../what-is-your-email-address/PageObjects/PO_EmailAddress';
import PO_TelNumber from './PageObjects/PO_TelNumber';
const fullNamePage = new PO_FullName();
const orgYouWorkFor = new PO_OrgYouWorkFor();
const emailAddress = new PO_EmailAddress();
const telNumber = new PO_TelNumber();

And('I have been asked what is your telephone number', () => {
	fullNamePage.enterTextIntoFullNameField('TestFirstName TestMiddleName TestLastName');
	cy.clickSaveAndContinue();
	orgYouWorkFor.enterTextIntoOrgNameField('Test Organisation Name');
	cy.clickSaveAndContinue();
	emailAddress.enterTextIntoEmailField('testpins2@gmail.com');
	cy.clickSaveAndContinue();
});

When('I continue with the value {string} in the telephone number field', (text) => {
	telNumber.enterTextIntoTelephoneNumberField(text);
	cy.clickSaveAndContinue();
});

Then('I click on back link', () => {
	cy.clickOnBackLink();
});

Then('I am on the {string} page', (pageName) => {
	cy.assertUserOnThePage(pageName);
});
