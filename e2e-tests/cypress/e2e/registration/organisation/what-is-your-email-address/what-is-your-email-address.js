import { Given, When } from 'cypress-cucumber-preprocessor/steps';
import PO_EmailAddress from '../what-is-your-email-address/PageObjects/PO_EmailAddress';
const emailAddressPage = new PO_EmailAddress();

import PO_WhatIsOrgName from '../organisation-name/PageObjects/OrganisationNamePage';
import PO_FullName from '../full-name/PageObjects/PO_FullName';
import PO_WhatIsJobTitle from '../what-is-your-job-title-or-volunteer-role/PageObjects/PO_WhatIsJobTitle';

const orgNamePage = new PO_WhatIsOrgName();
const fullNamePage = new PO_FullName();
const jobTitlePage = new PO_WhatIsJobTitle();

Given('I have been asked to provide my email address', () => {
	fullNamePage.enterTextIntoFullNameField('TestFirstName TestMiddleName TestLastName');
	fullNamePage.clickSaveAndContinue();
	fullNamePage.selectRadioYesOrNo('Yes');
	fullNamePage.clickSaveAndContinue();
	orgNamePage.enterTextIntoOrganisationNameField('Organisation name');
	orgNamePage.clickSaveAndContinue();
	jobTitlePage.assertOnPage('What is your job title or volunteer role?');
	jobTitlePage.enterTextIntoJobTitleField('Test job title');
	jobTitlePage.clickSaveAndContinue();
	emailAddressPage.assertOnPage('what is your email address? organisation');
});

When('I continue with the value {string} in the email field', (text) => {
	emailAddressPage.enterTextIntoEmailField(text);
	emailAddressPage.clickSaveAndContinue();
});
