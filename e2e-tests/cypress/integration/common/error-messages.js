import {Then} from "cypress-cucumber-preprocessor/steps";

Then('the following error message should be presented: {string}', (msg) => {
  cy.confirmTextOnPage(msg);
})
