import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import PO_FullName from "../full-name/PageObjects/PO_FullName";
import PO_AddressDetails from "../uk-address-details/PageObjects/PO_AddressDetails";
import PO_EmailAddress from "../what-is-your-email-address/PageObjects/PO_EmailAddress";
import PO_TeleNumber from "../what-is-your-telephone-number/PageObjects/PO_TeleNumber";
import PO_TellAboutProject from "../what-do-you-want-to-tell-about-project/PageObjects/PO_TellAboutProject";
import PO_CyaBeforeReg from "../check-your-answers-before-registering/PageObjects/PO_CyaBeforeReg";
const fullNamePage = new PO_FullName
const addressDetails = new PO_AddressDetails
const emailAddressPage = new PO_EmailAddress
const teleNumberPage = new PO_TeleNumber
const tellAboutProject = new PO_TellAboutProject
const cyaBeforeReg = new PO_CyaBeforeReg

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

And('I verify below data is present on Check your answers before registering page', function (table) {
    cyaBeforeReg.assertDataOnPage(table)
})

And('I click on {string} change link', (linkType) => {
    cyaBeforeReg.clickOnChangeLink(linkType);
})

And('User clicks on accept and continue button', () => {
    cy.clickOnHref('/register/myself/declaration');
})

When('user selects {string} radio option on Do you want to add another comment page', (radioChoice) => {
    cy.selectRadioYesOrNo(radioChoice)
})