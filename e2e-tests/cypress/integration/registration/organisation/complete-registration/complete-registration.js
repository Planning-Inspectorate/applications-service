import { Given, When } from 'cypress-cucumber-preprocessor/steps';
import PO_FullName from '../full-name/PageObjects/PO_FullName';
import PO_AddressDetails from '../uk-address-details/PageObjects/PO_AddressDetails';
import PO_EmailAddress from '../what-is-your-email-address/PageObjects/PO_EmailAddress';
import PO_TeleNumber from '../what-is-your-telephone-number/PageObjects/PO_TeleNumber';
import PO_TellAboutProject from '../what-do-you-want-to-tell-about-project/PageObjects/PO_TellAboutProject';
import PO_WhatIsJobTitle from '../what-is-your-job-title-or-volunteer-role/PageObjects/PO_WhatIsJobTitle';
import OrganisationNamePage from '../organisation-name/PageObjects/OrganisationNamePage';
const fullNamePage = new PO_FullName();
const addressDetails = new PO_AddressDetails();
const emailAddressPage = new PO_EmailAddress();
const telephoneNumberPage = new PO_TeleNumber();
const commentsPage = new PO_TellAboutProject();
const orgNamePage = new OrganisationNamePage();
const jobTitlePage = new PO_WhatIsJobTitle();

Given('I have been asked to check my answers', () => {
  fullNamePage.enterTextIntoFullNameField('TestFirstName TestMiddleName TestLastName');
  cy.clickSaveAndContinue();
  cy.selectRadioYesOrNo('Yes');
  cy.clickSaveAndContinue();
  orgNamePage.enterTextIntoOrganisationNameField('Organisation name');
  cy.clickSaveAndContinue();
  cy.assertUserOnThePage('What is your job title or volunteer role?');
  jobTitlePage.enterTextIntoJobTitleField('Test job title');
  cy.clickSaveAndContinue();
  emailAddressPage.enterTextIntoEmailField('test@test.com');
  cy.clickSaveAndContinue();
  addressDetails.enterTextFromObjectIntoAddressFields({
    AddressLine1: 'Address Line 1',
    PostCode: 'NE27 0QQ',
    Country: 'United Kingdom',
  });
  cy.clickSaveAndContinue();
  telephoneNumberPage.enterTextIntoTelephoneNumberField('07859894511');
  cy.clickSaveAndContinue();
  commentsPage.enterTextIntoCommentsField('This is a test comment');
  cy.clickSaveAndContinue();
  cy.assertUserOnThePage('check your answers before registering organisation');
});

When('I confirm my answers are correct', () => {
  cy.clickOnHref('/register/organisation/declaration');
});

When('I accept the declaration', () => {
  cy.get('[data-cy="button-accept-and-regoster"]').click();
});
