import { Then, And } from 'cypress-cucumber-preprocessor/steps';
import PO_FullName from '../full-name/PageObjects/PO_FullName';
import PO_OrgYouWorkFor from '../what-is-the-name-of-org-you-work-for/PageObjects/PO_OrgYouWorkFor';
import PO_EmailAddress from '../what-is-your-email-address/PageObjects/PO_EmailAddress';
import PO_AddressDetails from './PageObjects/PO_AddressDetails';
const fullNamePage = new PO_FullName();
const orgYouWorkFor = new PO_OrgYouWorkFor();
const emailAddress = new PO_EmailAddress();
const addressDetails = new PO_AddressDetails();

And('I have been asked to provide my postal address', () => {
	fullNamePage.enterTextIntoFullNameField('TestFirstName TestMiddleName TestLastName');
	fullNamePage.clickSaveAndContinue();
	orgYouWorkFor.enterTextIntoOrgNameField('Test Organisation Name');
	orgYouWorkFor.clickSaveAndContinue();
	emailAddress.enterTextIntoEmailField('testpins2@gmail.com');
	emailAddress.clickSaveAndContinue();
});

And('I continue with the following values in the address fields', function (table) {
	addressDetails.enterTextIntoAddressFields(table);
	addressDetails.clickSaveAndContinue();
});

Then('I click on back link', () => {
	addressDetails.clickBackLink();
});

Then('I am on the {string} page', (pageName) => {
	addressDetails.assertOnPage(pageName);
});
