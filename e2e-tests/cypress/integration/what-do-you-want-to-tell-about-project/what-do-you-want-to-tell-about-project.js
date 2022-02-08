import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import PO_FullName from "../full-name/PageObjects/PO_FullName";
import PO_AddressDetails from "../uk-address-details/PageObjects/PO_AddressDetails";
import PO_EmailAddress from "../what-is-your-email-address/PageObjects/PO_EmailAddress";
import PO_TeleNumber from "../what-is-your-telephone-number/PageObjects/PO_TeleNumber";
import PO_TellAboutProject from "../what-do-you-want-to-tell-about-project/PageObjects/PO_TellAboutProject";
const fullNamePage = new PO_FullName
const addressDetails = new PO_AddressDetails
const emailAddressPage = new PO_EmailAddress
const teleNumberPage = new PO_TeleNumber
const tellAboutProject = new PO_TellAboutProject

Given('I navigate to UK address details page', () => {
    cy.visit('/project-search', { failOnStatusCode: false });
    cy.clickProjectLink('North Lincolnshire Green Energy Park');
    cy.clickOnHref("/register-have-your-say");
    cy.clickOnHref('/register/who-registering-for');
    cy.selectRadioOption("Myself");
    cy.clickSaveAndContinue();
    fullNamePage.enterTextIntoFullNameField("TestFirstName TestMiddleName TestLastName");
    cy.clickSaveAndContinue();
    cy.selectRadioYesOrNo("Yes");
    cy.clickSaveAndContinue();
    emailAddressPage.enterTextIntoEmailField("testpins2@gmail.com");
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

Then('below error message should be presented on What do you want to tell us about this proposed project page', function (table) {
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

When('user selects {string} radio option on Do you want to add another comment page', (radioChoice) => {
    cy.selectRadioYesOrNo(radioChoice)
})

And('Do not include any personal details is present on the page', () => {
    tellAboutProject.assertDoNotIncludePersonalDetailsPresent();
})

And('user clicks on save and exit button', () => {
    cy.contains('Save & Exit').click();
})

Then('I can see email sent confimation text', () => {
    cy.get('[data-cy="email-confirmation"]').should('contain.text', 'We have sent a confirmation email to: testpins2@gmail.com');
})