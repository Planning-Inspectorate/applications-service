import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import PO_FullName from '../full-name/PageObjects/PO_FullName';
import PO_AddressDetails from '../uk-address-details/PageObjects/PO_AddressDetails';
import PO_EmailAddress from '../what-is-your-email-address/PageObjects/PO_EmailAddress';
import PO_TeleNumber from '../what-is-your-telephone-number/PageObjects/PO_TeleNumber';
import PO_TellAboutProject from '../what-do-you-want-to-tell-about-project/PageObjects/PO_TellAboutProject';
import PO_CyaOrg from '../check-your-answers-before-registering-organisation/PageObjects/PO_CyaOrg';
import PO_WhoYouRegisterFor from '../../who-are-you-registering-for/PageObjects/PO_WhoYouRegisterFor';
import PO_WhatIsOrgName from '../organisation-name/PageObjects/OrganisationNamePage';
import PO_WhatIsJobTitle from '../what-is-your-job-title-or-volunteer-role/PageObjects/PO_WhatIsJobTitle';
import PO_AIusagedecleration from '../ai-usage-decleration/PageObjects/PO_AIusagedecleration';

const fullNamePage = new PO_FullName();
const addressDetails = new PO_AddressDetails();
const emailAddressPage = new PO_EmailAddress();
const teleNumberPage = new PO_TeleNumber();
const tellAboutProject = new PO_TellAboutProject();
const cyaOrg = new PO_CyaOrg();
const whoYouRegisterForPage = new PO_WhoYouRegisterFor();
const orgNamePage = new PO_WhatIsOrgName();
const jobTitlePage = new PO_WhatIsJobTitle();
const aiUsageDecleration = new PO_AIusagedecleration();

Given('I navigate to AI usage declaration page using organisation route', () => {
	whoYouRegisterForPage.navigatetoTypeOfPartyPage();
	whoYouRegisterForPage.selectPartyAndContinue('Organisation');
	fullNamePage.enterTextIntoFullNameField('TestFirstName TestMiddleName TestLastName');
	fullNamePage.clickSaveAndContinue();
	fullNamePage.selectRadioYesOrNo('Yes');
	fullNamePage.clickSaveAndContinue();
	orgNamePage.enterTextIntoOrganisationNameField('Test Organisation');
	orgNamePage.clickSaveAndContinue();
	jobTitlePage.enterTextIntoJobTitleField('Test Volunteer Title');
	jobTitlePage.clickSaveAndContinue();
	emailAddressPage.enterTextIntoEmailField('test@gmail.com');
	emailAddressPage.clickSaveAndContinue();
	addressDetails.enterTextFromObjectIntoAddressFields({
		AddressLine1: 'Address Line 1',
		AddressLine2: '',
		AddressLine3: '',
		PostCode: 'NE27 0QQ',
		Country: 'United Kingdom'
	});
	addressDetails.clickSaveAndContinue();
	teleNumberPage.enterTextIntoTelephoneNumberField('1234567899');
	teleNumberPage.clickSaveAndContinue();
	tellAboutProject.enterTextIntoCommentsField(
		'used by the examining panel to decide if they recommend the project goes ahead, published on our website'
	);
	tellAboutProject.clickSaveAndContinue();
});

Then('I am on the {string} page', (pageName) => {
	if (pageName.toLowerCase().includes('ai usage declaration')) {
		aiUsageDecleration.assertOnPage(pageName);
		return;
	}

	if (pageName.toLowerCase().includes('check your answers before registering')) {
		cyaOrg.assertOnPage('check your answers before registering organisation');
		return;
	}

	cyaOrg.assertOnPage(pageName);
});

When('user selects {string} radio option on AI usage declaration page', (radioChoice) => {
	aiUsageDecleration.selectRadioOption(radioChoice);
});

And('I click on the continue button', () => {
	aiUsageDecleration.clickAISaveAndContinue();
});
