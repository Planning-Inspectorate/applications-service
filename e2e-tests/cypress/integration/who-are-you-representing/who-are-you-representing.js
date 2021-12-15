import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import PO_WhoYouRegisterFor from "../who-are-you-registering-for/PageObjects/PO_WhoYouRegisterFor";
import PO_WhoYouRepresenting from "./PageObjects/PO_WhoYouRepresenting";
const whoYouRepresenting = new PO_WhoYouRepresenting

const whoYouRegisterForPage = new PO_WhoYouRegisterFor

Given('I navigate to the who are you registering for page', () => {
    whoYouRegisterForPage.navigatetoTypeOfPartyPage()
})

Then('below error message should be presented on who are you representing page', function (table) {
    cy.assertErrorMessage(table)
})

When('user selects {string} on who are you representing page', (radioChoice) => {
    whoYouRepresenting.selectRadioOption(radioChoice)
})

And('User clicks on continue button', () => {
    cy.clickSaveAndContinue();
})

When('User selects {string}', (radioChoice) => {
    cy.selectRadioOption(radioChoice)
})

Then('I am on the {string} page', (pageName) => {
    cy.assertUserOnThePage(pageName)
})