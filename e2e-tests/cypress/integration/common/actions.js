import {When} from "cypress-cucumber-preprocessor/steps";

When('I click on the continue button', () => {
  cy.clickSaveAndContinue();
})
