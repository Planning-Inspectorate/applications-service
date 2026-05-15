import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import PO_FullName from '../full-name/PageObjects/PO_FullName';
import PO_AddressDetails from '../uk-address-details/PageObjects/PO_AddressDetails';
import PO_EmailAddress from '../what-is-your-email-address/PageObjects/PO_EmailAddress';
import PO_TeleNumber from '../what-is-your-telephone-number/PageObjects/PO_TeleNumber';
import PO_TellAboutProject from '../what-do-you-want-to-tell-about-project/PageObjects/PO_TellAboutProject';
import PO_CyaOrg from './PageObjects/PO_CyaOrg';
import OrganisationNamePage from '../organisation-name/PageObjects/OrganisationNamePage';
import PO_WhatIsJobTitle from '../what-is-your-job-title-or-volunteer-role/PageObjects/PO_WhatIsJobTitle';
import PO_WhoYouRegisterFor from '../../who-are-you-registering-for/PageObjects/PO_WhoYouRegisterFor';
import {
	registerAddAnotherCommentRadioStep,
	registerTopicFieldStep
} from '../../shared/registerCommentPageSteps';
const fullNamePage = new PO_FullName();
const addressDetails = new PO_AddressDetails();
const emailAddressPage = new PO_EmailAddress();
const teleNumberPage = new PO_TeleNumber();
const tellAboutProject = new PO_TellAboutProject();
const cyaOrg = new PO_CyaOrg();
const orgNamePage = new OrganisationNamePage();
const jobTitlePage = new PO_WhatIsJobTitle();
const whoYouRegisterForPage = new PO_WhoYouRegisterFor();

Given('I navigate to UK address details page using organisation route', () => {
	whoYouRegisterForPage.navigatetoTypeOfPartyPage();
	whoYouRegisterForPage.selectPartyAndContinue('Organisation');
	fullNamePage.enterTextIntoFullNameField('TestFirstName TestMiddleName TestLastName');
	fullNamePage.clickSaveAndContinue();
	orgNamePage.selectRadioYesOrNo('Yes');
	orgNamePage.clickSaveAndContinue();
	orgNamePage.enterTextIntoOrganisationNameField('Test Organisation');
	orgNamePage.clickSaveAndContinue();
	jobTitlePage.enterTextIntoJobTitleField('Test Volunteer Title');
	jobTitlePage.clickSaveAndContinue();
	emailAddressPage.enterTextIntoEmailField('test@gmail.com');
	emailAddressPage.clickSaveAndContinue();
});

And('I enter below data into address details page', function (table) {
	addressDetails.enterTextIntoAddressFields(table);
});

And('User clicks on continue button', () => {
	addressDetails.clickSaveAndContinue();
});

Then('I am on the {string} page', (pageName) => {
	cyaOrg.assertOnPage(pageName);
});

And('I enter {string} into email address field', (dataInput) => {
	emailAddressPage.enterTextIntoEmailField(dataInput);
});

And('I enter {string} into telephone number field', (dataInput) => {
	teleNumberPage.enterTextIntoTelephoneNumberField(dataInput);
});

And('I enter {string} into comments field', (dataInput) => {
	tellAboutProject.enterTextIntoCommentsField(dataInput);
});

And(
	'I verify below data is present on Check your answers before registering page',
	function (table) {
		cyaOrg.assertDataOnPage(table);
	}
);

And('I click on {string} change link', (linkType) => {
	cyaOrg.clickOnChangeLink(linkType);
});

And('User clicks on accept and continue button for {string}', () => {
	cyaOrg.clickDeclarationLink();
});

registerTopicFieldStep(And, tellAboutProject);
registerAddAnotherCommentRadioStep(When, tellAboutProject);
