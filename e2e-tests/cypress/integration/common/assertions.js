import {Then} from "cypress-cucumber-preprocessor/steps";

Then('I am on the {string} page', (pageName) => {
  cy.assertUserOnThePage(pageName)
})
