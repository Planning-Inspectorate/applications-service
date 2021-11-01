import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import PO_TypeOfParty from './PageObjects/PO_FullName'
import PageObject from '../PageObject'
import PO_FullName from "./PageObjects/PO_FullName";
const pageObject = new PageObject()
const fullNamePage = new PO_FullName()

Given('I navigate to what is your full name page selecting {string}', (radiochoice) => {
    cy.visit('/register/type-of-party', { failOnStatusCode: false });
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

Then('I verify the page title and heading of full name page', () => {
    fullNamePage.validatePageTitleandHeading()
})

And('I can see the text This service is only for Application service', () => {
    pageObject.validateHeaderContent()
})