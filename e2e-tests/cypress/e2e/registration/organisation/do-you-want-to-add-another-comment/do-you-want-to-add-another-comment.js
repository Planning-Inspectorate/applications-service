import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import PO_FullName from '../full-name/PageObjects/PO_FullName';
import PO_AddressDetails from '../uk-address-details/PageObjects/PO_AddressDetails';
import PO_EmailAddress from '../what-is-your-email-address/PageObjects/PO_EmailAddress';
import PO_TeleNumber from '../what-is-your-telephone-number/PageObjects/PO_TeleNumber';
import PO_TellAboutProject from '../what-do-you-want-to-tell-about-project/PageObjects/PO_TellAboutProject';
import PO_AddAnotherComment from './PageObjects/PO_AddAnotherComment';
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
const addAnotherComment = new PO_AddAnotherComment();
const orgNamePage = new OrganisationNamePage();
const jobTitlePage = new PO_WhatIsJobTitle();
const whoYouRegisterForPage = new PO_WhoYouRegisterFor();

Given('I navigate to UK address details page', () => {
	whoYouRegisterForPage.navigatetoTypeOfPartyPage();
	whoYouRegisterForPage.selectPartyAndContinue('Myself');
	fullNamePage.enterTextIntoFullNameField('TestFirstName TestMiddleName TestLastName');
	fullNamePage.clickSaveAndContinue();
	tellAboutProject.selectRadioYesOrNo('Yes');
	tellAboutProject.clickSaveAndContinue();
});

Given('I navigate to UK address details page using organisation route', () => {
	whoYouRegisterForPage.navigatetoTypeOfPartyPage();
	whoYouRegisterForPage.selectPartyAndContinue('An organisation I work or volunteer for');
	fullNamePage.enterTextIntoFullNameField('TestFirstName TestMiddleName TestLastName');
	fullNamePage.clickSaveAndContinue();
	orgNamePage.selectRadioYesOrNo('Yes');
	orgNamePage.clickSaveAndContinue();
	orgNamePage.enterTextIntoOrganisationNameField('Test Organisation');
	orgNamePage.clickSaveAndContinue();
	jobTitlePage.enterTextIntoJobTitleField('Test Volunteer Title');
	jobTitlePage.clickSaveAndContinue();
});

And('I enter below data into address details page', function (table) {
	addressDetails.enterTextIntoAddressFields(table);
});

And('User clicks on continue button', () => {
	addressDetails.clickSaveAndContinue();
});

Then('I am on the {string} page', (pageName) => {
	addAnotherComment.assertOnPage(pageName);
});

Then(
	'below error message should be presented on Do you want to add another comment page',
	function (table) {
		addAnotherComment.assertErrorMessages(table);
	}
);

And('I enter {string} into email address field', (dataInput) => {
	emailAddressPage.enterTextIntoEmailField(dataInput);
});

And('I enter {string} into telephone number field', (dataInput) => {
	teleNumberPage.enterTextIntoTelephoneNumberField(dataInput);
});

And('I enter {string} into comments field', (dataInput) => {
	tellAboutProject.enterTextIntoCommentsField(dataInput);
});

registerTopicFieldStep(And, tellAboutProject);
registerAddAnotherCommentRadioStep(When, addAnotherComment);

And('User clicks on {string} link', (link) => {
	addAnotherComment.clickOnLink(link);
});
