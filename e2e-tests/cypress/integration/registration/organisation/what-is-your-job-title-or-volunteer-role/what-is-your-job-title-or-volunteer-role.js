import { Given, When } from 'cypress-cucumber-preprocessor/steps';

import PO_WhatIsOrgName from '../organisation-name/PageObjects/OrganisationNamePage';
import PO_WhatIsJobTitle from './PageObjects/PO_WhatIsJobTitle';
import PO_FullName from '../full-name/PageObjects/PO_FullName';

const orgNamePage = new PO_WhatIsOrgName();
const fullNamePage = new PO_FullName();
const jobTitlePage = new PO_WhatIsJobTitle();

Given('I have been asked to provide my job title or volunteer role', () => {
	fullNamePage.enterTextIntoFullNameField('TestFirstName TestMiddleName TestLastName');
	cy.clickSaveAndContinue();
	cy.selectRadioYesOrNo('Yes');
	cy.clickSaveAndContinue();
	orgNamePage.enterTextIntoOrganisationNameField('Organisation name');
	cy.clickSaveAndContinue();
	cy.assertUserOnThePage('What is your job title or volunteer role?');
});

When('I continue with the value {string} in the job title or role field', (inputData) => {
	jobTitlePage.enterTextIntoJobTitleField(inputData);
	cy.clickSaveAndContinue();
});
