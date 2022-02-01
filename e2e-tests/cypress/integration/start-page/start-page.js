import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import PO_StartPage from "./PageObjects/PO_StartPage";
const startPage = new PO_StartPage()

Given('I navigate to Register to have your say page', () => {
    cy.visit('/project-search', { failOnStatusCode: false });
    cy.clickProjectLink('North Lincolnshire Green Energy Park');
    cy.clickOnHref("/register-have-your-say");
})

When('I click on start now button', () => {
    cy.clickOnHref('/register/who-registering-for');
})

Then('I am on the {string} page', (pageName) => {
    cy.assertUserOnThePage(pageName)
})