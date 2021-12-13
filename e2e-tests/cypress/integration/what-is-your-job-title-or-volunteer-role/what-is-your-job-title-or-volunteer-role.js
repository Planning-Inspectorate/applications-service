import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import PO_FullName from "../full-name/PageObjects/PO_FullName";
import PO_WhatIsJobTitle from "./PageObjects/PO_WhatIsJobTitle";
import PO_WhatIsOrgName from "../what-is-name-of-organisation-or-charity/PageObjects/PO_WhatIsOrgName";
const orgNamePage = new PO_WhatIsOrgName()
const fullNamePage = new PO_FullName()
const jobTitlePage = new PO_WhatIsJobTitle()


Given('I navigate to What is your job title or volunteer role page', () => {
    cy.visit('/register/start', { failOnStatusCode: false });
    cy.clickOnHref("/register/type-of-party");
    cy.selectRadioOption("An organisation I work or volunteer for");
    cy.clickSaveAndContinue();
    fullNamePage.enterTextIntoFullNameField("TestFirstName TestMiddleName TestLastName");
    cy.clickSaveAndContinue();
    cy.selectRadioYesOrNo("Yes");
    cy.clickSaveAndContinue();
    orgNamePage.enterTextIntoOrgNameField("Organisation name");
    cy.clickSaveAndContinue();
});

And('User clicks on continue button', () => {
    cy.clickSaveAndContinue();
})

Then('below error message should be presented on What is your job title or volunteer role page', function (table) {
    cy.assertErrorMessage(table)
})

Then('I am on the {string} page', (pageName) => {
    cy.assertUserOnThePage(pageName)
})

And('I enter text {string} into name of job title field', (inputData) => {
    jobTitlePage.enterTextIntoJobTitleField(inputData);
})