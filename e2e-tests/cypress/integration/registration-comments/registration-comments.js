import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import PO_RegComments from "./PageObjects/PO_RegComments";
const regComments = new PO_RegComments();

Given('I navigate to {string} project Overview page', (projectName) => {
    cy.visit('/project-search', { failOnStatusCode: false });
    if(projectName.includes('Ho Ho Hooo')) {
        cy.visit('/projects/TR033002');
    } else{
        cy.clickProjectLink(projectName);
    }
});

And('I click on {string} link', (pageName) => {
    cy.clickContentsLink(pageName);
 })

 And('I verify below pagination is present on the page', (table) => {
    regComments.assertIfPaginationIsPresent(table);
})

And('I navigate to page {string} of the results', (paginationLink) => {
    regComments.clickOnPaginationLink(paginationLink);
})

And('I verify text {string} is present on the page', (resultsText) => {
    regComments.assertDocumentResultsText(resultsText);
})

Then('I verify that only {string} results present on each page', (resultsPerPage) => {
    regComments.assertResultsPerPage(resultsPerPage);
})

Then('I verify no registration comments text present on the page', () => {
    regComments.assertNoRegCommentsOnThePage();
})

Then('I can verify that the registration comments displayed in descending order', (table) => {
    regComments.verifyCommentsDisplayedinDescendingOrder(table);
})

Then('I verify no pagination is present on the page', () => {
    regComments.assertNoPagination();
})