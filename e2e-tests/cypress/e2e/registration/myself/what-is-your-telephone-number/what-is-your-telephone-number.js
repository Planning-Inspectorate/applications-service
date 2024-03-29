import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import PO_FullName from '../full-name/PageObjects/PO_FullName';
import PO_AddressDetails from '../uk-address-details/PageObjects/PO_AddressDetails';
import PO_EmailAddress from '../what-is-your-email-address/PageObjects/PO_EmailAddress';
import PO_TeleNumber from '../what-is-your-telephone-number/PageObjects/PO_TeleNumber';
const fullNamePage = new PO_FullName();
const addressDetails = new PO_AddressDetails();
const emailAddressPage = new PO_EmailAddress();
const teleNumberPage = new PO_TeleNumber();

Given('I navigate to UK address details page', () => {
	cy.visit('/project-search', { failOnStatusCode: false });
	cy.clickProjectLink('North Lincolnshire Green Energy Park');
	cy.clickOnHref('/register-have-your-say');
	cy.clickOnHref('who-registering-for');
	cy.selectRadioOption('Myself');
	cy.clickSaveAndContinue();
	fullNamePage.enterTextIntoFullNameField('TestFirstName TestMiddleName TestLastName');
	cy.clickSaveAndContinue();
	cy.selectRadioYesOrNo('Yes');
	cy.clickSaveAndContinue();
	emailAddressPage.enterTextIntoEmailField('test@gmail.com');
	cy.clickSaveAndContinue();
});

And('I enter below data into address details page', function (table) {
	addressDetails.enterTextIntoAddressFields(table);
});

And('User clicks on continue button', () => {
	cy.clickSaveAndContinue();
});

Then(
	'below error message should be presented on What is your telephone number page',
	function (table) {
		cy.assertErrorMessage(table);
	}
);

When('I continue with the value {string} in the telephone number field', (text) => {
	teleNumberPage.enterTextIntoTelephoneNumberField(text);
	cy.clickSaveAndContinue();
});
