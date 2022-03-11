import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import PO_FullName from "../registration/myself/full-name/PageObjects/PO_FullName";
import PO_WhatIsOrgName from "./PageObjects/PO_WhatIsOrgName";
const orgNamePage = new PO_WhatIsOrgName()
const fullNamePage = new PO_FullName()

Given('I navigate to What is the name of your organisation or charity page', () => {
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
});

And('User clicks on continue button', () => {
    cy.clickSaveAndContinue();
})

Then('below error message should be presented on What is the name of your organisation or charity page', function (table) {
    cy.assertErrorMessage(table)
})

Then('I am on the {string} page', (pageName) => {
    cy.assertUserOnThePage(pageName)
})

And('I enter text {string} into name of organisation field', (inputData) => {
    orgNamePage.enterTextIntoOrgNameField(inputData);
})
