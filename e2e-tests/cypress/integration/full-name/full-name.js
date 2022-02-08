import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import PO_TypeOfParty from './PageObjects/PO_FullName'
import PageObject from '../PageObject'
import PO_FullName from "./PageObjects/PO_FullName";
const pageObject = new PageObject()
const fullNamePage = new PO_FullName()

Given('I navigate to what is your full name page selecting {string}', (radiochoice) => {
    cy.visit('/project-search', { failOnStatusCode: false });
    cy.clickProjectLink('North Lincolnshire Green Energy Park');
    cy.clickOnHref("/register-have-your-say");
    cy.clickOnHref('/register/who-registering-for');
    cy.selectRadioOption(radiochoice);
    cy.clickSaveAndContinue();
});

Then('below error message should be presented on full name page', function (table) {
    cy.assertErrorMessage(table)
})

And('User clicks on continue button', () => {
    cy.clickSaveAndContinue();
})

And('I can see the logo gov uk text', () => {
    pageObject.validateHeaderLogo()
})

And('I can see the text This service is only for Application service', () => {
    pageObject.validateHeaderContent()
})

Then('I click on back link', () => {
    cy.clickOnBackLink();
})

Then('I am on the {string} page', (pageName) => {
    cy.assertUserOnThePage(pageName)
})

And('I enter text {string} into full name field', (inputData) => {
    fullNamePage.enterTextIntoFullNameField(inputData);
})