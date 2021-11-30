import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import PO_FullName from "../full-name/PageObjects/PO_FullName";
import PO_AddressDetails from "../uk-address-details/PageObjects/PO_AddressDetails";
import PO_EmailAddress from "../what-is-your-email-address/PageObjects/PO_EmailAddress";
const fullNamePage = new PO_FullName
const addressDetails = new PO_AddressDetails
const emailAddressPage = new PO_EmailAddress

Given('I navigate to UK address details page', () => {
    cy.visit('/register/start', { failOnStatusCode: false });
    cy.clickOnHref("/register/type-of-party");
    cy.selectRadioOption("Myself");
    cy.clickSaveAndContinue();
    fullNamePage.enterTextIntoFullNameField("TestFirstName TestMiddleName TestLastName");
    cy.clickSaveAndContinue();
    cy.selectRadioYesOrNo("Yes");
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

Then('below error message should be presented on What is your email address page', function (table) {
    cy.assertErrorMessage(table)
})

And('I enter {string} into email address field', (dataInput) => {
    emailAddressPage.enterTextIntoEmailField(dataInput);
})