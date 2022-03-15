import { Given, And } from "cypress-cucumber-preprocessor/steps";
import PO_FullName from "../full-name/PageObjects/PO_FullName";
import PO_AddressDetails from "./PageObjects/PO_AddressDetails";
import PO_EmailAddress from "../what-is-your-email-address/PageObjects/PO_EmailAddress";
import OrganisationNamePage from "../organisation-name/PageObjects/OrganisationNamePage";
import PO_WhatIsJobTitle from "../what-is-your-job-title-or-volunteer-role/PageObjects/PO_WhatIsJobTitle";
const fullNamePage = new PO_FullName
const addressDetails = new PO_AddressDetails
const emailAddressPage = new PO_EmailAddress
const orgNamePage = new OrganisationNamePage
const jobTitlePage = new PO_WhatIsJobTitle()

Given('I have been asked to provide my postal address', () => {
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
    cy.assertUserOnThePage('what is your address? organisation')
  });

And('I continue with the following values in the address fields', function (table) {
    addressDetails.enterTextIntoAddressFields(table);
    cy.clickSaveAndContinue();
});
