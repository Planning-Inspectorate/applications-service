import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import PO_StartPage from "./PageObjects/PO_StartPage";
const startPage = new PO_StartPage()

Given('I navigate to Register to have your say page', () => {
    cy.visit('/register/start');
})

When('I click on start now button', () => {
    cy.clickOnHref('/register/type-of-party');
})

Then('I am on the {string} page', (pageName) => {
    cy.assertUserOnThePage(pageName)
})