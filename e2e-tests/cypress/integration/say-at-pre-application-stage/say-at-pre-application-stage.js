import { Given, Then, And } from 'cypress-cucumber-preprocessor/steps';
import PO_SayAtPreApplication from './PageObjects/PO_SayAtPreApplication';
const sayAtPreApplication = new PO_SayAtPreApplication();

Given('I navigate to Having your say at the pre-application stage page', () => {
  cy.visit('/having-your-say-guide');
  cy.get(
    'button.app-step-nav__button.app-step-nav__button--controls.js-step-controls-button'
  ).click();
  cy.clickLinkTonavigateToPage('Taking part in the pre-application stage');
});

Then('I am on the {string} page', (pageName) => {
  cy.assertUserOnThePage(pageName);
});

Then(
  'I verify below links present on Having your say at the pre-application stage',
  function (table) {
    sayAtPreApplication.assertLinksPresentOnPage(table);
  }
);

And('I click on {string} link', (pageName) => {
  cy.clickLinkTonavigateToPage(pageName);
});

And('I click on registering to have your say about a national infrastructure project link', () => {
  cy.get('#step-panel-registering-to-have-your-say-1').click();
});

And('I click on get involved in the preliminary meeting link', () => {
  cy.get('#step-panel-get-involved-in-the-preliminary-meeting-1 > p:nth-child(2) > a').click();
});

And('I click on Next link', () => {
  cy.get('#main-content > div > div.govuk-grid-column-two-thirds > div > div > a > strong').click();
});

And('I click on Having your say during the examination of the project link', () => {
  cy.get('#main-content > div > div.govuk-grid-column-two-thirds > div > div > a > span').click();
});
