import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import PO_OverviewPage from "./PageObjects/PO_OverviewPage";
const overviewPage = new PO_OverviewPage()

Given('I navigate to project Overview page', () => {
    cy.visit('/overview', { failOnStatusCode: false });
});

And('I verify the page title and heading of overview page', () => {
    overviewPage.validatePageTitleandHeading()
});

And('I click on register to have your say about national infrastructure project link', () => {
    cy.clickOnHref("/register/start");
});

Then('user is navigated to project start page', () => {
    overviewPage.assertUseronStartPage()
})