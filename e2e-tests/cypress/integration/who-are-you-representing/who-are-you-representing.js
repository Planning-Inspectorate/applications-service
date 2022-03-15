import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import PO_WhoYouRepresenting from "./PageObjects/PO_WhoYouRepresenting";
import PO_FullName from "../registration/myself/full-name/PageObjects/PO_FullName";
import PO_EmailAddress from "../registration/myself/what-is-your-email-address/PageObjects/PO_EmailAddress";
import PO_TeleNumber from "../registration/myself/what-is-your-telephone-number/PageObjects/PO_TeleNumber";
import PO_AddressDetails from "../registration/myself/uk-address-details/PageObjects/PO_AddressDetails";
import OrganisationNamePage from "../registration/organisation/organisation-name/PageObjects/OrganisationNamePage";
const whoYouRepresenting = new PO_WhoYouRepresenting
const fullNamePage = new PO_FullName
const emailAddressPage = new PO_EmailAddress
const teleNumberPage = new PO_TeleNumber
const addressDetails = new PO_AddressDetails
const organisationNamePage = new OrganisationNamePage

Given('I navigate to UK address details page as a representative of a person', () => {
    cy.visit('/project-search', { failOnStatusCode: false });
    cy.clickProjectLink('North Lincolnshire Green Energy Park');
    cy.clickOnHref("/register-have-your-say");
    cy.clickOnHref('/register/who-registering-for');
    cy.selectRadioOption("On behalf of another person or organisation");
    cy.clickSaveAndContinue();
    fullNamePage.enterTextIntoFullNameField("RepresentativeTest MiddleName LastName");
    cy.clickSaveAndContinue();
    organisationNamePage.enterTextIntoOrganisationNameField("Organisation Name");
    cy.clickSaveAndContinue();
    emailAddressPage.enterTextIntoEmailField("Representative_test@gmail.com");
    cy.clickSaveAndContinue();
    teleNumberPage.enterTextIntoTelephoneNumberField("1234567888");
    cy.clickSaveAndContinue();
});

And('I enter below data into address details page', function (table) {
    addressDetails.enterTextIntoAddressFields(table)
})

Then('below error message should be presented on who are you representing page', function (table) {
    cy.assertErrorMessage(table)
})

When('user selects {string} on who are you representing page', (radioChoice) => {
    whoYouRepresenting.selectRadioOption(radioChoice)
})

And('User clicks on continue button', () => {
    cy.clickSaveAndContinue();
})

When('User selects {string}', (radioChoice) => {
    cy.selectRadioOption(radioChoice)
})

Then('I am on the {string} page', (pageName) => {
    cy.assertUserOnThePage(pageName)
})
