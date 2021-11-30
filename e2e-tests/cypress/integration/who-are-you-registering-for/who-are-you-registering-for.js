import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import PO_WhoYouRegisterFor from './PageObjects/PO_WhoYouRegisterFor'
import PageObject from '../PageObject'
const whoYouRegisterForPage = new PO_WhoYouRegisterFor()
const pageObject = new PageObject()

Given('I navigate to the who are you registering for page', () => {
    whoYouRegisterForPage.navigatetoTypeOfPartyPage()
})

Then('I am on the {string} page', (pageName) => {
    cy.assertUserOnThePage(pageName)
})

And("I can see the radio options content", () => {
    whoYouRegisterForPage.validateRadioOptionContent()
})

And('I can see the logo gov uk text', () => {
    pageObject.validateHeaderLogo()
})

And('I can see the text This service is only for Application service', () => {
    pageObject.validateHeaderContent()
})

Then('below error message should be presented on who are you registering for page', function (table) {
    cy.assertErrorMessage(table)
})

When('User selects {string}', (radioChoice) => {
    cy.selectRadioOption(radioChoice)
})

And('User clicks on continue button', () => {
    cy.clickSaveAndContinue();
})

Then('I click on {string} logo', (logoLink) => {
    switch (logoLink) {
        case "planning inspectorate": pageObject.clickOnPlanningInspectorateLogo();
            break;
        case "crown copyright": pageObject.clickOnCrownCopyRight();
            break;
        default: throw console.error('uanble to find specified logo link: ' + logoLink);
    }
})

Then('I click on feedback link', () => {
    pageObject.clickOnProvideFeedbackLink()
})

Then('I click on back link', () => {
    cy.clickOnBackLink();
})