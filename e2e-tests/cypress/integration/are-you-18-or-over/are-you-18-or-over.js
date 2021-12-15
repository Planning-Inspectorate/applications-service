import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import PO_FullName from "../full-name/PageObjects/PO_FullName";
const fullNamePage = new PO_FullName

Given('I navigate to Are you 18 or over page', () => {
    cy.visit('/register/type-of-party', { failOnStatusCode: false });
    cy.selectRadioOption("Myself");
    cy.clickSaveAndContinue();
    fullNamePage.enterTextIntoFullNameField("TestFirstName TestMiddleName TestLastName");
    cy.clickSaveAndContinue();
});

And('User clicks on continue button', () => {
    cy.clickSaveAndContinue();
})

Then('below error message should be presented on are you 18 or over page', function (table) {
    cy.assertErrorMessage(table)
})

When('user selects {string} radio option on are you 18 or over page', (radioChoice) => {
    cy.selectRadioYesOrNo(radioChoice)
})

Then('I am on the {string} page', (pageName) => {
    cy.assertUserOnThePage(pageName)
})