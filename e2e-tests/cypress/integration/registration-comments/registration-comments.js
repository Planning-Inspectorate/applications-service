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

Given('I have navigated to registration comments for the {string} project', (projectName) => {
  cy.visit('/project-search', { failOnStatusCode: false });
  cy.clickProjectLink(projectName);
  cy.clickContentsLink("Registration comments");
});

When('I search for comments containing {string}', (searchInput) => {
  regComments.enterTextIntoSearchField(searchInput);
  regComments.submitSearch();
});

Then('a list of registration comments with metadata containing {string} is provided', (searchInput) => {
  cy.get('.pins-govuk-result-list__item').each((element) => {
    expect(element.text().toLowerCase()).to.contain(searchInput.toLowerCase());
  })
});

Then('the list is sorted by received date, newest first', (searchInput) => {
  const datesProvided = [];
  cy.get('[data-cy="published-date"]').each((element) => {
    datesProvided.push(Date.parse(element.text()));
  })
  const sortedDates = [...datesProvided];
  sortedDates.sort((a, b) => a - b).reverse();
  expect(datesProvided).to.deep.eq(sortedDates);
});

Then('I am informed that no results were found', () => {

});

Then('I am given the option to clear the search to list all available registration comments', () => {

});
