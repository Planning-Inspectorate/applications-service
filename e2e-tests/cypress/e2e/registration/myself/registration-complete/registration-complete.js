import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import PO_FullName from '../full-name/PageObjects/PO_FullName';
import PO_AddressDetails from '../uk-address-details/PageObjects/PO_AddressDetails';
import PO_EmailAddress from '../what-is-your-email-address/PageObjects/PO_EmailAddress';
import PO_TeleNumber from '../what-is-your-telephone-number/PageObjects/PO_TeleNumber';
import PO_TellAboutProject from '../what-do-you-want-to-tell-about-project/PageObjects/PO_TellAboutProject';
import PO_RegComplete from './PageObjects/PO_RegComplete';
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
const registrationComplete = new PO_RegComplete();
const whoYouRegisterForPage = new PO_WhoYouRegisterFor();

Given('I navigate to UK address details page', () => {
	whoYouRegisterForPage.navigatetoTypeOfPartyPage();
	whoYouRegisterForPage.selectPartyAndContinue('Myself');
	fullNamePage.enterTextIntoFullNameField('TestFirstName TestMiddleName TestLastName');
	fullNamePage.clickSaveAndContinue();
	emailAddressPage.selectRadioYesOrNo('Yes');
	emailAddressPage.clickSaveAndContinue();
	emailAddressPage.enterTextIntoEmailField('test@gmail.com');
	emailAddressPage.clickSaveAndContinue();
});

And('User clicks on continue button', () => {
	addressDetails.clickSaveAndContinue();
});

And('I enter below data into address details page', function (table) {
	addressDetails.enterTextIntoAddressFields(table);
});

Then('I am on the {string} page', (pageName) => {
	registrationComplete.assertOnPage(pageName);
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

And('User clicks on accept and continue button for {string}', (linkType) => {
	registrationComplete.clickDeclarationLink(linkType);
});

And('User clicks on accept and register button', () => {
	registrationComplete.clickAcceptAndRegister();
});

And(
	'I click on find out more about having your say during the Examination of the application link',
	() => {
		registrationComplete.clickExaminationGuideLink();
	}
);

registerTopicFieldStep(And, tellAboutProject);
registerAddAnotherCommentRadioStep(When, tellAboutProject);

Then('I click on feedback link', () => {
	registrationComplete.clickOnProvideFeedbackLink();
});

Then('I click on go back to project page link', () => {
	registrationComplete.clickProjectLink();
});
