import {Given, When} from "cypress-cucumber-preprocessor/steps";

Given('I am registering as an {string}', (radioChoice) => {
  cy.visit('/project-search', { failOnStatusCode: false });
  cy.clickProjectLink('North Lincolnshire Green Energy Park');
  cy.clickOnHref("/register-have-your-say");
  cy.clickOnHref('/register/who-registering-for');
  cy.selectRadioOption(radioChoice);
  cy.clickSaveAndContinue();
});

When('I click on the continue button', () => {
  cy.clickSaveAndContinue();
})
