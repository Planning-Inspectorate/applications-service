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
    emailAddressPage.enterTextIntoEmailField("test@gmail.com");
    cy.clickSaveAndContinue();
});

And('User clicks on continue button', () => {
    cy.clickSaveAndContinue();
})

And('I enter below data into address details page', function (table) {
    addressDetails.enterTextIntoAddressFields(table)
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

And('User clicks on accept and continue button for {string}', (linkType) => {
    switch (linkType) {
        case "myself": cy.clickOnHref('/register/myself/declaration');
            break;
        case "organisation": cy.clickOnHref('/register/organisation/declaration');
            break;
    }
})

And('User clicks on accept and register button', () => {
    cy.get('[data-cy="button-accept-and-regoster"]').click();
})

And('I click on find out more about having your say during the Examination of the application link', () => {
    cy.clickOnHref('/having-your-say-guide/have-your-say-examination');
})

And('I enter {string} into topic field', (dataInput) => {
    tellAboutProject.enterTextIntoTopicField(dataInput);
})

When('user selects {string} radio option on Do you want to add another comment page', (radioChoice) => {
    cy.selectRadioYesOrNo(radioChoice)
})

Then('I click on feedback link', () => {
    cy.get('.govuk-link').each(($e1, index) => {
        const text = $e1.text();
        if (text.includes("feedback")) {
            cy.get('.govuk-link').eq(index).click();
        }
    })
})

Then('I click on go back to project page link', () => {
    cy.get('#project-link').click();
})