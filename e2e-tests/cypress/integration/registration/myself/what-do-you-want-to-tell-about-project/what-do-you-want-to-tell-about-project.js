import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import PO_FullName from "../full-name/PageObjects/PO_FullName";
import PO_AddressDetails from "../uk-address-details/PageObjects/PO_AddressDetails";
import PO_TeleNumber from "../what-is-your-telephone-number/PageObjects/PO_TeleNumber";
import PO_TellAboutProject from "../what-do-you-want-to-tell-about-project/PageObjects/PO_TellAboutProject";
import PO_EmailAddress from "../what-is-your-email-address/PageObjects/PO_EmailAddress";
const fullNamePage = new PO_FullName
const addressDetails = new PO_AddressDetails
const emailAddressPage = new PO_EmailAddress
const telephoneNumberPage = new PO_TeleNumber
const tellAboutProject = new PO_TellAboutProject

const shortComment = "I am against the proposal since it will reduce resident parking provision"

Given('I navigate to UK address details page', () => {
    cy.visit('/project-search', { failOnStatusCode: false });
    cy.clickProjectLink('North Lincolnshire Green Energy Park');
    cy.clickOnHref("/register-have-your-say");
    cy.clickOnHref('/register/who-registering-for');
    cy.selectRadioOption("Myself");
    cy.clickSaveAndContinue();
    fullNamePage.enterTextIntoFullNameField("TestFirstName TestMiddleName TestLastName");
    cy.clickSaveAndContinue();
    cy.selectRadioYesOrNo("Yes");
    cy.clickSaveAndContinue();
    emailAddressPage.enterTextIntoEmailField("testpins2@gmail.com");
    cy.clickSaveAndContinue();
});

When('I continue with the following values in the address fields', function (table) {
  addressDetails.enterTextIntoAddressFields(table);
  cy.clickSaveAndContinue();
});

When('I continue with the value {string} in the telephone number field', (text) => {
  telephoneNumberPage.enterTextIntoTelephoneNumberField(text);
  cy.clickSaveAndContinue();
})

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
