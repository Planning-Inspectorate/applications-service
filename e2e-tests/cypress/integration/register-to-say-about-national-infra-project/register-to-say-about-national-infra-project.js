import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import PO_RegisterToSayAboutNationalInfraProject from "./PageObjects/PO_RegisterToSayAboutNationalInfraProject";
const registerToSayAboutNationalInfraProject = new PO_RegisterToSayAboutNationalInfraProject();

Given('I have navigated to the "Have your say" guide', () => {
    cy.visit('/having-your-say-guide');
})

Given('I have selected the "Have your say" link from the related guides section', () => {
  cy.clickOnHref('../having-your-say-guide/');
})


Given('I have viewed the overview page for a project', () => {
  cy.visit('/project-search', { failOnStatusCode: false });
  cy.clickProjectLink('North Lincolnshire Green Energy Park');
})

When('I select the "How to register link"', () => {
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

And('the page does not include a link to a project', () => {
  cy.get('#project-link').should('not.exist');
})

Then('I click on feedback link', () => {
    cy.get('.govuk-link').each(($e1, index) => {
        const text = $e1.text();
        if(text.includes("feedback")){
            cy.get('.govuk-link').eq(index).click(); 
        }
    })
  })
