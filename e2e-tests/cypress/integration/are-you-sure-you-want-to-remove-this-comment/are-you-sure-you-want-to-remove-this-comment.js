import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import PO_FullName from "../full-name/PageObjects/PO_FullName";
import PO_WhatIsOrgName from "../what-is-name-of-organisation-or-charity/PageObjects/PO_WhatIsOrgName";
import PO_AddressDetails from "../uk-address-details/PageObjects/PO_AddressDetails";
import PO_EmailAddress from "../what-is-your-email-address/PageObjects/PO_EmailAddress";
import PO_TeleNumber from "../what-is-your-telephone-number/PageObjects/PO_TeleNumber";
import PO_TellAboutProject from "../what-do-you-want-to-tell-about-project/PageObjects/PO_TellAboutProject";
import PO_WhatIsJobTitle from "../what-is-your-job-title-or-volunteer-role/PageObjects/PO_WhatIsJobTitle";
import PO_AddAnotherComment from "../do-you-want-to-add-another-comment/PageObjects/PO_AddAnotherComment";
const fullNamePage = new PO_FullName
const orgNamePage = new PO_WhatIsOrgName
const jobTitlePage = new PO_WhatIsJobTitle
const addressDetails = new PO_AddressDetails
const emailAddressPage = new PO_EmailAddress
const teleNumberPage = new PO_TeleNumber
const tellAboutProject = new PO_TellAboutProject
const addAnotherComment = new PO_AddAnotherComment

Given('I navigate to UK address details page using organisation route', () => {
    cy.visit('/project-search', { failOnStatusCode: false });
    cy.clickProjectLink('North Lincolnshire Green Energy Park');
    cy.clickOnHref("/register-have-your-say");
    cy.clickOnHref('/register/who-registering-for');
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

Then('below error message should be presented on Are you sure you want to remove this comment page', function (table) {
    cy.assertErrorMessage(table)
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

And('User clicks on {string} link', (link) => {
    addAnotherComment.clickOnLink(link);
})

And('user selects {string} radio option on Are you sure you want to remove this comment page', (radioChoice) => {
    cy.selectRadioYesOrNo(radioChoice);
})