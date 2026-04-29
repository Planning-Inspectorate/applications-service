import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import PO_FullName from '../full-name/PageObjects/PO_FullName';
import PO_AddressDetails from '../uk-address-details/PageObjects/PO_AddressDetails';
import PO_TeleNumber from '../what-is-your-telephone-number/PageObjects/PO_TeleNumber';
import PO_TellAboutProject from '../what-do-you-want-to-tell-about-project/PageObjects/PO_TellAboutProject';
import PO_EmailAddress from '../what-is-your-email-address/PageObjects/PO_EmailAddress';
import { registerCommentPageSteps } from '../../shared/registerCommentPageSteps';
const fullNamePage = new PO_FullName();
const addressDetails = new PO_AddressDetails();
const emailAddressPage = new PO_EmailAddress();
const telephoneNumberPage = new PO_TeleNumber();
const tellAboutProject = new PO_TellAboutProject();

Given('I navigate to UK address details page', () => {
	cy.visit('/project-search');
	cy.clickProjectLink('North Lincolnshire Green Energy Park');
	cy.clickOnHref('/register-have-your-say');
	cy.clickOnHref('who-registering-for');
	cy.selectRadioOption('Myself');
	cy.clickSaveAndContinue();
	fullNamePage.enterTextIntoFullNameField('TestFirstName TestMiddleName TestLastName');
	cy.clickSaveAndContinue();
	cy.selectRadioYesOrNo('Yes');
	cy.clickSaveAndContinue();
	emailAddressPage.enterTextIntoEmailField('testpins2@gmail.com');
	cy.clickSaveAndContinue();
});

When('I continue with the following values in the address fields', function (table) {
	addressDetails.enterTextIntoAddressFields(table);
	cy.clickSaveAndContinue();
});

When('I continue with the value {string} in the telephone number field', (text) => {
	telephoneNumberPage.enterTextIntoTelephoneNumberField(text);
	cy.clickSaveAndContinue();
});

registerCommentPageSteps({ And, Then, When }, tellAboutProject, 'testpins2@gmail.com');
