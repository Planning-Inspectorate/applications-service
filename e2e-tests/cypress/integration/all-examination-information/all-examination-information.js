import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import PO_AllExamInfo from "./PageObjects/PO_AllExamInfo";
const allExamInfo = new PO_AllExamInfo();

Given('I navigate to All Examination information page', () => {
    cy.visit('/project-search', { failOnStatusCode: false });
    cy.clickProjectLink('North Lincolnshire Green Energy Park');
    cy.clickContentsLink('All Examination documents');
});

Then('I am on the {string} page', (pageName) => {
    cy.assertUserOnThePage(pageName)
})

And('I click on {string} link', (pageName) => {
    cy.clickContentsLink(pageName);
 })

 When('I enter text {string} into search field', (searchInput) => {
    allExamInfo.enterTextIntoSearchField(searchInput);
 })

 And('I click on search', () => {
    allExamInfo.clickOnSearch();
 })

 Then('below rows should be returned', (table) => {
     allExamInfo.assertResultsPresentOnPage(table);
 })

 And('sort by drop down should be having Recently updated', () => {
     allExamInfo.assertResultsSortedByIsPresent();
 })

 Then('No documents found Please try with different search text should be displayed', () => {
    cy.confirmTextOnPage("No documents found. Please try with different search text.");
 })