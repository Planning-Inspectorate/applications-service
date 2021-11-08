import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import PO_RegisterToSayAboutNationalInfraProject from "./PageObjects/PO_RegisterToSayAboutNationalInfraProject";
const registerToSayAboutNationalInfraProject = new PO_RegisterToSayAboutNationalInfraProject();

Given('I navigate to Registering to have your say about a national infrastructure project page', () => {
    cy.visit('/interested-party-guide');
    cy.get('button.app-step-nav__button.app-step-nav__button--controls.js-step-controls-button').click();
    cy.clickLinkTonavigateToPage('registering to have your say about a national infrastructure project');
})

Then('I verify below links present on Registering to have your say about a national infrastructure project', function (table) {
    registerToSayAboutNationalInfraProject.assertLinksPresentOnPage(table);
})

Then('I am on the {string} page', (pageName) => {
    cy.assertUserOnThePage(pageName);
})

And('I click on {string} link', (pageName) => {
    cy.clickLinkTonavigateToPage(pageName);
 })

 And('I click on Next link', () => {
    cy.get('#main-content > div > div.govuk-grid-column-two-thirds > div > div > a > strong').click();
})

And('I click on Get involved in the preliminary meeting link', () => {
    cy.get('#main-content > div > div.govuk-grid-column-two-thirds > div > div > a > span').click();
})

And('I click on registering to have your say about a national infrastructure project link', () => {
    cy.get('#step-panel-registering-to-have-your-say-1').click();
})

And('I click on get involved in the preliminary meeting link', () => {
    cy.get('#step-panel-get-involved-in-the-preliminary-meeting-1 > p:nth-child(2) > a').click();
})