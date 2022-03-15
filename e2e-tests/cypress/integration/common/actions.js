import {Given, When} from "cypress-cucumber-preprocessor/steps";

Given('I am registering as an organisation', () => {
  cy.visit('/project-search', { failOnStatusCode: false });
  cy.clickProjectLink('North Lincolnshire Green Energy Park');
  cy.clickOnHref("/register-have-your-say");
  cy.clickOnHref('/register/who-registering-for');
  cy.selectRadioOption("An organisation I work or volunteer for");
  cy.clickSaveAndContinue();
});

When('I click on the continue button', () => {
  cy.clickSaveAndContinue();
})
