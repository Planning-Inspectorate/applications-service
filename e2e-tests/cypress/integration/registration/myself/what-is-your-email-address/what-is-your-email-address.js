import { Given, When } from 'cypress-cucumber-preprocessor/steps';
import PO_FullName from '../full-name/PageObjects/PO_FullName';
import PO_EmailAddress from '../what-is-your-email-address/PageObjects/PO_EmailAddress';
const fullNamePage = new PO_FullName();
const emailAddressPage = new PO_EmailAddress();

Given('I navigate to email address page', () => {
	cy.visit('/project-search', { failOnStatusCode: false });
	cy.clickProjectLink('North Lincolnshire Green Energy Park');
	cy.clickOnHref('/register-have-your-say');
	cy.clickOnHref('/register/who-registering-for');
	cy.selectRadioOption('Myself');
	cy.clickSaveAndContinue();
	fullNamePage.enterTextIntoFullNameField('TestFirstName TestMiddleName TestLastName');
	cy.clickSaveAndContinue();
	cy.selectRadioYesOrNo('Yes');
	cy.clickSaveAndContinue();
});

When('I continue with the value {string} in the email field', (text) => {
	emailAddressPage.enterTextIntoEmailField(text);
	cy.clickSaveAndContinue();
});
