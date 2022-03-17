import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import PO_FullName from "../full-name/PageObjects/PO_FullName";
import PO_OrgYouWorkFor from "../what-is-the-name-of-org-you-work-for/PageObjects/PO_OrgYouWorkFor";
import PO_EmailAddress from "../what-is-your-email-address/PageObjects/PO_EmailAddress";
import PO_TelNumber from "../what-is-your-telephone-number/PageObjects/PO_TelNumber";
import PO_AddressDetails from "../uk-address-details/PageObjects/PO_AddressDetails";
import PO_WhoYouRepresenting from "../who-are-you-representing/PageObjects/PO_WhoYouRepresenting";
import PO_RepName from "./PageObjects/PO_RepName";
const fullNamePage = new PO_FullName()
const orgYouWorkFor = new PO_OrgYouWorkFor()
const emailAddress = new PO_EmailAddress()
const telNumber = new PO_TelNumber()
const addressDetails = new PO_AddressDetails()
const whoYouRepresenting = new PO_WhoYouRepresenting()
const repName = new PO_RepName()

And('I have been asked to provide details of the name of the person you are representing', () => {
    fullNamePage.enterTextIntoFullNameField("TestFirstName TestMiddleName TestLastName");
    cy.clickSaveAndContinue();
    orgYouWorkFor.enterTextIntoOrgNameField("Test Organisation Name");
    cy.clickSaveAndContinue();
    emailAddress.enterTextIntoEmailField("testpins2@gmail.com");
    cy.clickSaveAndContinue();
    telNumber.enterTextIntoTelephoneNumberField("123456789");
    cy.clickSaveAndContinue();
    addressDetails.enterTextFromObjectIntoAddressFields({
        AddressLine1: 'Address Line 1', PostCode: 'NE27 0BB', Country: 'United Kingdom',
      });
    cy.clickSaveAndContinue();
    whoYouRepresenting.selectRadioOption("A person");
    cy.clickSaveAndContinue();
});

Then('I click on back link', () => {
    cy.clickOnBackLink();
})

Then('I am on the {string} page', (pageName) => {
    cy.assertUserOnThePage(pageName)
})

When('I continue with the value {string} in the representee name field', (text) => {
  repName.enterTextIntoRepNameField(text);
  cy.clickSaveAndContinue();
})