import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import PO_WhoYouRegisterFor from '../registration/who-are-you-registering-for/PageObjects/PO_WhoYouRegisterFor';
import PO_CookiePage from "./PageObjects/PO_CookiePage";
const whoYouRegisterForPage = new PO_WhoYouRegisterFor();
const cookiePage = new PO_CookiePage();

Given('I navigate to the who are you registering for page', () => {
    whoYouRegisterForPage.navigatetoTypeOfPartyPage()
})

Then('I am on the {string} page', (pageName) => {
    cy.assertUserOnThePage(pageName)
})

And('I click on {string} cookies button', (cookieChoice) => {
    cookiePage.clickOnCookieChoice(cookieChoice)
})

Then ('I verify below text is present on the page', function (table) {
    const data = table.hashes();
    cy.confirmTextOnPage(data[0].Text);
})

And('I select {string} radio choice', (radioChoice) => {
    cookiePage.selectRadioChoice(radioChoice)
})

And ('I click on save changes on cookie settings page', () => {
    cookiePage.clickSaveChangesButton()
})

And('I click on go back to the page you were looking at link', () => {
    cookiePage.clickGoBackToThePageLink()
})

Then('I click on back link', () => {
    cy.clickOnBackLink();
})
