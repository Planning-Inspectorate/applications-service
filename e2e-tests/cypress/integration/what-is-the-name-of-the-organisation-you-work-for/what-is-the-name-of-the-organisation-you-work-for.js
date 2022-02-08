import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

import PO_NameofOrgYouWorkFor from "../what-is-the-name-of-the-organisation-you-work-for/PageObjects/PO_NameofOrgYouWorkFor";
import PO_FullName from "../full-name/PageObjects/PO_FullName";
const fullNamePage = new PO_FullName()
const nameOfOrgYouWorkFor = new PO_NameofOrgYouWorkFor;

Given('I navigate to What is the name of organisation you work for page', () => {
    cy.visit('/project-search', { failOnStatusCode: false });
    cy.clickProjectLink('North Lincolnshire Green Energy Park');
    cy.clickOnHref("/register-have-your-say");
    cy.clickOnHref('/register/who-registering-for');
    cy.selectRadioOption("On behalf of another person or organisation");
    cy.clickSaveAndContinue();
    fullNamePage.enterTextIntoFullNameField("TestFirstName TestMiddleName TestLastName");
    cy.clickSaveAndContinue();
});

And('I enter {string} into name of org you work for field', (dataInput) => {
    nameOfOrgYouWorkFor.enterNameOfOrgYouWorkFor(dataInput);
})

Then('below error message should be presented on What is the name of organisation you work for page', function (table) {
    cy.assertErrorMessage(table)
})

Then('I am on the {string} page', (pageName) => {
    cy.assertUserOnThePage(pageName)
})

And('User clicks on continue button', () => {
    cy.clickSaveAndContinue();
})

And('user clicks on I dont work for organisation link', () => {
    cy.clickOnHref("/register/behalf/email");
})