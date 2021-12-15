import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import PO_FullName from "../full-name/PageObjects/PO_FullName";
import PO_AddressDetails from "../uk-address-details/PageObjects/PO_AddressDetails";
import PO_EmailAddress from "../what-is-your-email-address/PageObjects/PO_EmailAddress";
import PO_TeleNumber from "../what-is-your-telephone-number/PageObjects/PO_TeleNumber";
import PO_TellAboutProject from "../what-do-you-want-to-tell-about-project/PageObjects/PO_TellAboutProject";
import PO_WhatIsOrgName from "../what-is-name-of-organisation-or-charity/PageObjects/PO_WhatIsOrgName";
import PO_WhatIsJobTitle from "../what-is-your-job-title-or-volunteer-role/PageObjects/PO_WhatIsJobTitle";
const fullNamePage = new PO_FullName
const addressDetails = new PO_AddressDetails
const emailAddressPage = new PO_EmailAddress
const teleNumberPage = new PO_TeleNumber
const tellAboutProject = new PO_TellAboutProject
const orgNamePage = new PO_WhatIsOrgName
const jobTitlePage = new PO_WhatIsJobTitle

Given('I navigate to UK address details page using organisation route', () => {
    cy.visit('/register/type-of-party', { failOnStatusCode: false });
    cy.selectRadioOption("An organisation I work or volunteer for");
    cy.clickSaveAndContinue();
    fullNamePage.enterTextIntoFullNameField("TestFirstName TestMiddleName TestLastName");
    cy.clickSaveAndContinue();
    cy.selectRadioYesOrNo("Yes");
    cy.clickSaveAndContinue();
    orgNamePage.enterTextIntoOrgNameField("Test Organisation");
    cy.clickSaveAndContinue();
    jobTitlePage.enterTextIntoJobTitleField("Test Volunteer Title");
    cy.clickSaveAndContinue();
});

And('I enter below data into address details page', function (table) {
    addressDetails.enterTextIntoAddressFields(table)
})

And('User clicks on continue button', () => {
    cy.clickSaveAndContinue();
})

Then('I am on the {string} page', (pageName) => {
    cy.assertUserOnThePage(pageName)
})

And('I enter {string} into email address field', (dataInput) => {
    emailAddressPage.enterTextIntoEmailField(dataInput);
})

And('I enter {string} into telephone number field', (dataInput) => {
    teleNumberPage.enterTextIntoTelephoneNumberField(dataInput);
})

And('I enter {string} into comments field', (dataInput) => {
    tellAboutProject.enterTextIntoCommentsField(dataInput);
})

And('I enter {string} into topic field', (dataInput) => {
    tellAboutProject.enterTextIntoTopicField(dataInput);
})

And('User clicks on accept and continue button for {string}', (linkType) => {
    switch (linkType) {
        case "myself": cy.clickOnHref('/register/myself/declaration');
            break;
        case "organisation": cy.clickOnHref('/register/organisation/declaration');
            break;
    }
})

When('user selects {string} radio option on Do you want to add another comment page', (radioChoice) => {
    cy.selectRadioYesOrNo(radioChoice)
})

And('I click on find out more about having your say during the Examination of the application link', () => {
    cy.clickOnHref('/interested-party-guide');
})

And('User clicks on accept and register button', () => {
    cy.get('[data-cy="button-accept-and-regoster"]').click();
})