import { And } from "cypress-cucumber-preprocessor/steps";

And('User clicks on continue button', () => {
    cy.clickSaveAndContinue();
})