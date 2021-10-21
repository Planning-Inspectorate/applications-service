import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import PO_TypeOfParty from './PageObjects/PO_TypeOfParty'
import PageObject from '../PageObject'
const typeOfPartyPage = new PO_TypeOfParty()
const pageObject = new PageObject()

Given('I navigate to the Type of party page', () => {
  typeOfPartyPage.navigatetoTypeOfPartyPageURL()
})

Then('I am on the Type of party page', () => {
  pageObject.validateHeaderLogo()
  typeOfPartyPage.validatePageTitle()
  typeOfPartyPage.validateText()
})

And('I can see the logo gov uk text', () => {
  pageObject.validateHeaderLogo()
})

And('I can see the text This service is only for Application service', () => {
  pageObject.validatePageHeaderlink()
})

Then('Progress is halted with a message that a Type of party is required', () => {
  cy.title().should('include', 'Error: ');
  cy.confirmTextOnPage('Select what type of interested party are you');
})

When('User selects {string}', (radioChoice) => {
  if(radioChoice === "An person interested in having my say") {
    cy.get('[data-cy="answer-mySay"]').click();
  } else if(radioChoice === "Someone registering for an organisation I work or volunteer for") {
    cy.get('[data-cy="answer-organisation"]').click();
  } else if(radioChoice === "Someone registering on behalf of anothet person or organisation") {
    cy.get('[data-cy="answer-behalfOfOrganisation"]').click();
  }  
  cy.wait(Cypress.env('demoDelay'));
})

Then('User is navigated to full-name page', () => {
  cy.url().should('include', '/register/full-name')
  cy.wait(Cypress.env('demoDelay'));
})