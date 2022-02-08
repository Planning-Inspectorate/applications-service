import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import PO_GetInvolvedInPreliminaryMeeting from "./PageObjects/PO_GetInvolvedInPreliminaryMeeting";
const getInvolvedInPreliminaryMeeting = new PO_GetInvolvedInPreliminaryMeeting();

Given('I navigate to Get involved in the preliminary meeting page', () => {
    cy.visit('/having-your-say-guide');
    // cy.get('button.app-step-nav__button.app-step-nav__button--controls.js-step-controls-button').click();
    cy.get('#get-involved-in-the-preliminary-meeting').click();
    cy.clickLinkTonavigateToPage('get involved in the preliminary meeting');
})

Then('I verify below links present on Get involved in the preliminary meeting', function (table) {
    getInvolvedInPreliminaryMeeting.assertLinksPresentOnPage(table);
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

And('I click on Having your say during the examination of the project link', () => {
    cy.get('#main-content > div > div.govuk-grid-column-two-thirds > div > div > a > span').click();
})

And('I click on registering to have your say about a national infrastructure project link', () => {
    cy.get('#step-panel-registering-to-have-your-say-1').click();
})

And('I click on get involved in the preliminary meeting link', () => {
    cy.get('#step-panel-get-involved-in-the-preliminary-meeting-1 > p:nth-child(2) > a').click();
})

And('I click on Have your say during the examination of the project link', () => {
    cy.get('#step-panel-have-your-say-during-examination-1 > p:nth-child(2) > a').click();
})