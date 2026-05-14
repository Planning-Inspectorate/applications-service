import { When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import PO_FullName from '../full-name/PageObjects/PO_FullName';
import PO_OrgYouWorkFor from '../what-is-the-name-of-org-you-work-for/PageObjects/PO_OrgYouWorkFor';
import PO_EmailAddress from '../what-is-your-email-address/PageObjects/PO_EmailAddress';
import PO_TelNumber from '../what-is-your-telephone-number/PageObjects/PO_TelNumber';
import PO_AddressDetails from '../uk-address-details/PageObjects/PO_AddressDetails';
import PO_WhoYouRepresenting from '../who-are-you-representing/PageObjects/PO_WhoYouRepresenting';
import PO_RepName from '../representee-name/PageObjects/PO_RepName';
import PO_RepAddressDetails from '../what-is-their-address/PageObjects/PO_RepAddressDetails';
import PO_RepEmailAddress from '../what-is-their-email-address/PageObjects/PO_RepEmailAddress';
import PO_RepTelNumber from './PageObjects/PO_RepTelNumber';
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

And('I have been asked what is representee telephone number', () => {
	fullNamePage.enterTextIntoFullNameField('TestFirstName TestMiddleName TestLastName');
	fullNamePage.clickSaveAndContinue();
	orgYouWorkFor.enterTextIntoOrgNameField('Test Organisation Name');
	orgYouWorkFor.clickSaveAndContinue();
	emailAddress.enterTextIntoEmailField('testpins2@gmail.com');
	emailAddress.clickSaveAndContinue();
	addressDetails.enterTextFromObjectIntoAddressFields({
		AddressLine1: 'Address Line 1',
		PostCode: 'NE27 0BB',
		Country: 'United Kingdom'
	});
	addressDetails.clickSaveAndContinue();
	telNumber.enterTextIntoTelephoneNumberField('123456789');
	telNumber.clickSaveAndContinue();
	whoYouRepresenting.selectRadioOption('A person');
	whoYouRepresenting.clickSaveAndContinue();
	repName.enterTextIntoRepNameField('Representee FirstName Representee LastName');
	repName.clickSaveAndContinue();
	repName.selectRadioYesOrNo('Yes');
	repName.clickSaveAndContinue();
	repEmailAddress.enterTextIntoRepEmailField('representeetestpins2@gmail.com');
	repEmailAddress.clickSaveAndContinue();
	repAddressDetails.enterTextFromObjectIntoAddressFields({
		AddressLine1: 'Representee Address Line 1',
		PostCode: 'NE27 0BB',
		Country: 'United Kingdom'
	});
	repAddressDetails.clickSaveAndContinue();
});

When('I continue with the value {string} in the representee telephone number field', (text) => {
	repTelNumber.enterTextIntoRepTelephoneNumberField(text);
	repTelNumber.clickSaveAndContinue();
});

Then('I click on back link', () => {
	repTelNumber.clickBackLink();
});

Then('I am on the {string} page', (pageName) => {
	repTelNumber.assertOnPage(pageName);
});
