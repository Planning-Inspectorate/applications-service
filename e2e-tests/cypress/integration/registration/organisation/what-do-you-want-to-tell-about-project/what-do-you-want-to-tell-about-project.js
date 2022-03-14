import {And, Given, Then, When} from "cypress-cucumber-preprocessor/steps";
import PO_FullName from "../full-name/PageObjects/PO_FullName";
import PO_AddressDetails from "../uk-address-details/PageObjects/PO_AddressDetails";
import PO_TeleNumber from "../what-is-your-telephone-number/PageObjects/PO_TeleNumber";
import PO_TellAboutProject from "../what-do-you-want-to-tell-about-project/PageObjects/PO_TellAboutProject";
import PO_EmailAddress from "../what-is-your-email-address/PageObjects/PO_EmailAddress";
import OrganisationNamePage from "../organisation-name/PageObjects/OrganisationNamePage";
import PO_WhatIsJobTitle from "../what-is-your-job-title-or-volunteer-role/PageObjects/PO_WhatIsJobTitle";

const fullNamePage = new PO_FullName
const addressDetails = new PO_AddressDetails
const emailAddressPage = new PO_EmailAddress
const telephoneNumberPage = new PO_TeleNumber
const tellAboutProject = new PO_TellAboutProject
const orgNamePage = new OrganisationNamePage
const jobTitlePage = new PO_WhatIsJobTitle

const shortComment = "I am against the proposal since it will reduce resident parking provision"

Given('I have been asked for comments on a proposed project', () => {
  fullNamePage.enterTextIntoFullNameField("TestFirstName TestMiddleName TestLastName");
  cy.clickSaveAndContinue();
  cy.selectRadioYesOrNo("Yes");
  cy.clickSaveAndContinue();
  orgNamePage.enterTextIntoOrganisationNameField("Organisation name");
  cy.clickSaveAndContinue();
  cy.assertUserOnThePage('What is your job title or volunteer role?')
  jobTitlePage.enterTextIntoJobTitleField("Test job title")
  cy.clickSaveAndContinue();
  emailAddressPage.enterTextIntoEmailField('test@test.com')
  cy.clickSaveAndContinue();
  addressDetails.enterTextFromObjectIntoAddressFields({
    AddressLine1: 'Address Line 1', PostCode: 'NE27 0QQ', Country: 'United Kingdom',
  });
  cy.clickSaveAndContinue();
  telephoneNumberPage.enterTextIntoTelephoneNumberField('07859894511')
  cy.clickSaveAndContinue();
  cy.assertUserOnThePage('what do you want to tell us about this proposed project? organisation')
});

And('I continue with an empty value in the comments field', () => {
  cy.clickSaveAndContinue();
})

And('I save and exit with an empty value in the comments field', () => {
  cy.get('[data-cy="button-save-and-return"]').first().click();
  cy.wait(Cypress.env('demoDelay'));
})

And('I continue with a comment beyond the maximum characters allowed', () => {
  cy.fixture('comment-too-long.txt').then( (comment) => {
    tellAboutProject.enterTextIntoCommentsFieldDirectly(comment.trim());
    cy.clickSaveAndContinue();
  });
})

And('I save and exit with a comment beyond the maximum characters allowed', () => {
  cy.fixture('comment-too-long.txt').then( (comment) => {
    tellAboutProject.enterTextIntoCommentsFieldDirectly(comment.trim());
    cy.get('[data-cy="button-save-and-return"]').first().click();
    cy.wait(Cypress.env('demoDelay'));
  });
})

And('I continue with a comment at the maximum characters allowed', () => {
  cy.fixture('comment-max-length.txt').then( (comment) => {
    tellAboutProject.enterTextIntoCommentsFieldDirectly(comment.trim());
    cy.clickSaveAndContinue();
  });
})

And('I save and exit with a comment at the maximum characters allowed', () => {
  cy.fixture('comment-max-length.txt').then( (comment) => {
    tellAboutProject.enterTextIntoCommentsFieldDirectly(comment.trim());
    cy.get('[data-cy="button-save-and-return"]').first().click();
    cy.wait(Cypress.env('demoDelay'));
  });
})

And('I continue with a short comment', () => {
  tellAboutProject.enterTextIntoCommentsField(shortComment);
  cy.clickSaveAndContinue();
})

And('I save and exit with a short comment', () => {
  tellAboutProject.enterTextIntoCommentsField(shortComment);
  cy.get('[data-cy="button-save-and-return"]').first().click();
  cy.wait(Cypress.env('demoDelay'));
})

And('I enter {string} into topic field', (dataInput) => {
  tellAboutProject.enterTextIntoTopicField(dataInput);
})

When('user selects {string} radio option on Do you want to add another comment page', (radioChoice) => {
    cy.selectRadioYesOrNo(radioChoice)
})

Then('advice to not include any personal details is present on the page', () => {
    tellAboutProject.assertDoNotIncludePersonalDetailsPresent();
})

Then('I can see email sent confirmation text', () => {
    cy.get('[data-cy="email-confirmation"]').should('contain.text', 'We have sent a link to get back to your saved registration to: testpins2@gmail.com');
})
