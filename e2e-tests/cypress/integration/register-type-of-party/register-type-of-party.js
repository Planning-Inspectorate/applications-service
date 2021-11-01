import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import PO_TypeOfParty from './PageObjects/PO_TypeOfParty'
import PageObject from '../PageObject'
const typeOfPartyPage = new PO_TypeOfParty()
const pageObject = new PageObject()

Given('I navigate to the Type of party page', () => {
    typeOfPartyPage.navigatetoTypeOfPartyPageURL()
})

Then('I verify the page title and heading of interested party page', () => {
    typeOfPartyPage.validatePageTitleandHeading()
})

And("I can see the radio options content", () => {
    typeOfPartyPage.validateRadioOptionContent()
})

And('I can see the logo gov uk text', () => {
    pageObject.validateHeaderLogo()
})

And('I can see the text This service is only for Application service', () => {
    pageObject.validateHeaderContent()
})

Then('below error message should be presented on interested party page', function (table) {
    cy.assertErrorMessage(table)
})

When('User selects {string}', (radioChoice) => {
    cy.selectRadioOption(radioChoice)
})

And('User clicks on continue button', () => {
    cy.clickSaveAndContinue();
})

Then('User is navigated to full-name page', () => {
    typeOfPartyPage.assertUseronFullNamePage()
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

Then('I navigate to {string} home page', (thirdPartyPage) => {
    pageObject.assertUseronThirdPartyPage(thirdPartyPage)
})