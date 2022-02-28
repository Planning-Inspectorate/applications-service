import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

Given('I navigate to Decision making process guide page', () => {
    cy.visit('/project-search', { failOnStatusCode: false });
    cy.clickProjectLink('North Lincolnshire Green Energy Park');
    cy.clickLinkTonavigateToPage('Find out more about the decision making process for national infrastructure projects');
})

Then('I am on the {string} page', (pageName) => {
    cy.assertUserOnThePage(pageName);
})

And('I click on show all link', () => {
    cy.get('*[class^="app-step-nav__button app-step-nav__button--controls js-step-controls-button"]').click();
})

And('I click on {string} link', (pageName) => {
    cy.clickLinkTonavigateToPage(pageName);
 })

 Then('I verify below links present on Pre-examination page', function (table) {
    cy.assertLinksPresentOnPage(table);
})