import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import PO_FullName from "../full-name/PageObjects/PO_FullName";
import PO_AddressDetails from "./PageObjects/PO_AddressDetails";
const fullNamePage = new PO_FullName
const addressDetails = new PO_AddressDetails

Given('I navigate to UK address details page', () => {
    cy.visit('/register/type-of-party', { failOnStatusCode: false });
    cy.selectRadioOption("Myself");
    cy.clickSaveAndContinue();
    fullNamePage.enterTextIntoFullNameField("TestFirstName TestMiddleName TestLastName");
    cy.clickSaveAndContinue();
    cy.selectRadioYesOrNo("Yes");
    cy.clickSaveAndContinue();
});

Then('I am on the {string} page', (pageName) => {
    cy.assertUserOnThePage(pageName)
})

And('User clicks on continue button', () => {
    cy.clickSaveAndContinue();
})

Then('below error message should be presented on UK address details page', function (table) {
    cy.assertErrorMessage(table)
})

And('I enter below data into address details page', function (table) {
    addressDetails.enterTextIntoAddressFields(table)
})