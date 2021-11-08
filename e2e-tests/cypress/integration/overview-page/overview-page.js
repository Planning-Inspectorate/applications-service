import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import PO_OverviewPage from "./PageObjects/PO_OverviewPage";
const overviewPage = new PO_OverviewPage()

Given('I navigate to project Overview page', () => {
    cy.visit('/overview', { failOnStatusCode: false });
});

Then('I am on the {string} page', (pageName) => {
    cy.assertUserOnThePage(pageName)
})

And('I click on register to have your say about national infrastructure project link', () => {
    cy.clickOnHref("/register/start");
});