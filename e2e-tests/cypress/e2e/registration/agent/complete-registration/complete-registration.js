import { Then, And } from 'cypress-cucumber-preprocessor/steps';
import PO_FullName from '../full-name/PageObjects/PO_FullName';
import PO_OrgYouWorkFor from '../what-is-the-name-of-org-you-work-for/PageObjects/PO_OrgYouWorkFor';
import PO_EmailAddress from '../what-is-your-email-address/PageObjects/PO_EmailAddress';
import PO_TelNumber from '../what-is-your-telephone-number/PageObjects/PO_TelNumber';
import PO_AddressDetails from '../uk-address-details/PageObjects/PO_AddressDetails';
import PO_WhoYouRepresenting from '../who-are-you-representing/PageObjects/PO_WhoYouRepresenting';
import PO_RepName from '../representee-name/PageObjects/PO_RepName';
import PO_RepAddressDetails from '../what-is-their-address/PageObjects/PO_RepAddressDetails';
import PO_RepEmailAddress from '../what-is-their-email-address/PageObjects/PO_RepEmailAddress';
import PO_RepTelNumber from '../what-is-their-telephone-number/PageObjects/PO_RepTelNumber';
import PO_TellAboutProject from '../what-do-you-want-to-tell-about-project/PageObjects/PO_TellAboutProject';
import PO_CyaBeforeReg from './PageObjects/PO_CyaBeforeReg';
const fullNamePage = new PO_FullName();
const orgYouWorkFor = new PO_OrgYouWorkFor();
const emailAddress = new PO_EmailAddress();
const telNumber = new PO_TelNumber();
const addressDetails = new PO_AddressDetails();
const whoYouRepresenting = new PO_WhoYouRepresenting();
const repName = new PO_RepName();
const repAddressDetails = new PO_RepAddressDetails();
const repEmailAddress = new PO_RepEmailAddress();
const repTelNumber = new PO_RepTelNumber();
const tellAboutProject = new PO_TellAboutProject();
const cyaBeforeReg = new PO_CyaBeforeReg();

const shortComment = 'I am against the proposal since it will reduce resident parking provision';

And('I have been asked to check my answers', () => {
	fullNamePage.enterTextIntoFullNameField('TestFirstName TestMiddleName TestLastName');
	cy.clickSaveAndContinue();
	orgYouWorkFor.enterTextIntoOrgNameField('Test Organisation Name');
	cy.clickSaveAndContinue();
	emailAddress.enterTextIntoEmailField('testpins2@gmail.com');
	cy.clickSaveAndContinue();
	addressDetails.enterTextFromObjectIntoAddressFields({
		AddressLine1: 'Address Line 1',
		PostCode: 'NE27 0BB',
		Country: 'United Kingdom'
	});
	cy.clickSaveAndContinue();
	telNumber.enterTextIntoTelephoneNumberField('123456789');
	cy.clickSaveAndContinue();
	whoYouRepresenting.selectRadioOption('A person');
	cy.clickSaveAndContinue();
	repName.enterTextIntoRepNameField('Representee FirstName Representee LastName');
	cy.clickSaveAndContinue();
	cy.selectRadioYesOrNo('Yes');
	cy.clickSaveAndContinue();
	repAddressDetails.enterTextFromObjectIntoAddressFields({
		AddressLine1: 'Representee Address Line 1',
		PostCode: 'NE27 0BB',
		Country: 'United Kingdom'
	});
	cy.clickSaveAndContinue();
	repEmailAddress.enterTextIntoRepEmailField('representeetestpins2@gmail.com');
	cy.clickSaveAndContinue();
	repTelNumber.enterTextIntoRepTelephoneNumberField('12121212121');
	cy.clickSaveAndContinue();
	tellAboutProject.enterTextIntoCommentsField(shortComment);
	cy.clickSaveAndContinue();
});

Then('I am on the {string} page', (pageName) => {
	cy.assertUserOnThePage(pageName);
});

And(
	'I verify below data is present on Check your answers before registering page',
	function (table) {
		cyaBeforeReg.assertDataOnPage(table);
	}
);

And('User clicks on accept and continue button for {string}', (linkType) => {
	switch (linkType) {
		case 'myself':
			cy.clickOnHref('/register/myself/declaration');
			break;
		case 'organisation':
			cy.clickOnHref('/register/organisation/declaration');
			break;
		case 'on behalf':
			cy.clickOnHref('/register/agent/declaration');
			break;
	}
});

And('User clicks on accept and register button', () => {
	cy.get('[data-cy="button-accept-and-regoster"]').click();
});

And('I click on {string} change link', (linkType) => {
	cyaBeforeReg.clickOnChangeLink(linkType);
});

And('user selects {string} on who are you representing page', (radioChoice) => {
	whoYouRepresenting.selectRadioOption(radioChoice);
});
