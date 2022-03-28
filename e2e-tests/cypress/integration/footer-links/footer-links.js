import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import PO_WhoYouRegisterFor from "../registration/who-are-you-registering-for/PageObjects/PO_WhoYouRegisterFor";
const whoYouRegisterForPage = new PO_WhoYouRegisterFor()

Given('I navigate to the who are you registering for page', () => {
    whoYouRegisterForPage.navigatetoTypeOfPartyPage()
})

And('I click on {string} footer link', (linkType) => {
    switch (linkType) {
        case "Sitemap": cy.get('[data-cy="Privacy"]').click();
            break;
        case "Terms and conditions": cy.get('[data-cy="Terms and conditions"]').click();
            break;
        case "Accessibility": cy.get('[data-cy="Accessibility"]').click();
            break;
        case "Privacy Notice": cy.get('[data-cy="Privacy Notice (on GOV.UK)"]').click();
            break;
        case "Cookies": cy.get('[data-cy="Cookies"]').click();
            break;
        case "The Planning Inspectorate": cy.clickOnHref("http://planninginspectorate.gov.uk/");
            break;
    }
})

Then('I am on the {string} page', (pageName) => {
    cy.assertUserOnThePage(pageName)
})
