import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import PO_FullName from '../full-name/PageObjects/PO_FullName';
import PO_AddressDetails from '../uk-address-details/PageObjects/PO_AddressDetails';
import PO_TeleNumber from '../what-is-your-telephone-number/PageObjects/PO_TeleNumber';
import PO_TellAboutProject from '../what-do-you-want-to-tell-about-project/PageObjects/PO_TellAboutProject';
import PO_EmailAddress from '../what-is-your-email-address/PageObjects/PO_EmailAddress';
import OrganisationNamePage from '../organisation-name/PageObjects/OrganisationNamePage';
import PO_WhatIsJobTitle from '../what-is-your-job-title-or-volunteer-role/PageObjects/PO_WhatIsJobTitle';
import { registerCommentPageSteps } from '../../shared/registerCommentPageSteps';

const fullNamePage = new PO_FullName();
const addressDetails = new PO_AddressDetails();
const emailAddressPage = new PO_EmailAddress();
const telephoneNumberPage = new PO_TeleNumber();
const tellAboutProject = new PO_TellAboutProject();
const orgNamePage = new OrganisationNamePage();
const jobTitlePage = new PO_WhatIsJobTitle();

Given('I have been asked for comments on a proposed project', () => {
	fullNamePage.enterTextIntoFullNameField('TestFirstName TestMiddleName TestLastName');
	fullNamePage.clickSaveAndContinue();
	fullNamePage.selectRadioYesOrNo('Yes');
	fullNamePage.clickSaveAndContinue();
	orgNamePage.enterTextIntoOrganisationNameField('Organisation name');
	orgNamePage.clickSaveAndContinue();
	jobTitlePage.assertOnPage('What is your job title or volunteer role?');
	jobTitlePage.enterTextIntoJobTitleField('Test job title');
	jobTitlePage.clickSaveAndContinue();
	emailAddressPage.enterTextIntoEmailField('testpins2@gmail.com');
	emailAddressPage.clickSaveAndContinue();
	addressDetails.enterTextFromObjectIntoAddressFields({
		AddressLine1: 'Address Line 1',
		PostCode: 'NE27 0QQ',
		Country: 'United Kingdom'
	});
	addressDetails.clickSaveAndContinue();
	telephoneNumberPage.enterTextIntoTelephoneNumberField('07859894511');
	telephoneNumberPage.clickSaveAndContinue();
	tellAboutProject.assertOnPage(
		'what do you want to tell us about this proposed project? organisation'
	);
});

registerCommentPageSteps({ And, Then, When }, tellAboutProject, 'testpins2@gmail.com');
