import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import PO_StartPage from "./PageObjects/PO_StartPage";
const startPage = new PO_StartPage()

Given('I navigate to Register to have your say page', () => {
    cy.visit('/register/start');
})

And('I verify the page title and heading of start page', () => {
    startPage.validatePageTitleandHeading()
})

When('I click on start now button {string}', (link) => {
    cy.clickOnHref(link);
})

Then('user is navigated to type of interested party page', () => {
    startPage.assertUseronTypeofPartyPage()
})