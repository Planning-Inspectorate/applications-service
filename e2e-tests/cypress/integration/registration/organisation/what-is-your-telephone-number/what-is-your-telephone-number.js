import { Given, When } from 'cypress-cucumber-preprocessor/steps';
import PO_FullName from '../full-name/PageObjects/PO_FullName';
import PO_AddressDetails from '../uk-address-details/PageObjects/PO_AddressDetails';
import PO_EmailAddress from '../what-is-your-email-address/PageObjects/PO_EmailAddress';
import PO_TeleNumber from '../what-is-your-telephone-number/PageObjects/PO_TeleNumber';
import OrganisationNamePage from '../organisation-name/PageObjects/OrganisationNamePage';
import PO_WhatIsJobTitle from '../what-is-your-job-title-or-volunteer-role/PageObjects/PO_WhatIsJobTitle';
const fullNamePage = new PO_FullName();
const addressDetails = new PO_AddressDetails();
const emailAddressPage = new PO_EmailAddress();
const teleNumberPage = new PO_TeleNumber();
const orgNamePage = new OrganisationNamePage();
const jobTitlePage = new PO_WhatIsJobTitle();

Given('I have been asked to provide my telephone number', () => {
	fullNamePage.enterTextIntoFullNameField('TestFirstName TestMiddleName TestLastName');
	cy.clickSaveAndContinue();
	cy.selectRadioYesOrNo('Yes');
	cy.clickSaveAndContinue();
	orgNamePage.enterTextIntoOrganisationNameField('Organisation name');
	cy.clickSaveAndContinue();
	cy.assertUserOnThePage('What is your job title or volunteer role?');
	jobTitlePage.enterTextIntoJobTitleField('Test job title');
	cy.clickSaveAndContinue();
	emailAddressPage.enterTextIntoEmailField('test@test.com');
	cy.clickSaveAndContinue();
	addressDetails.enterTextFromObjectIntoAddressFields({
		AddressLine1: 'Address Line 1',
		PostCode: 'NE27 0QQ',
		Country: 'United Kingdom'
	});
	cy.clickSaveAndContinue();
	cy.assertUserOnThePage('what is your telephone number? organisation');
});

When('I continue with the value {string} in the telephone number field', (text) => {
	teleNumberPage.enterTextIntoTelephoneNumberField(text);
	cy.clickSaveAndContinue();
});
