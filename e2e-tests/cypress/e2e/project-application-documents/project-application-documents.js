import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import PO_ProjectAppDocs from './PageObjects/PO_ProjectAppDocs';
const projectAppDocs = new PO_ProjectAppDocs();

Given('I navigate to {string} project Overview page', (projectName) => {
	cy.visit('/project-search', { failOnStatusCode: false });
	if (projectName.includes('Ho Ho Hooo')) {
		cy.visit('/projects/TR033002');
	} else {
		cy.clickProjectLink(projectName);
	}
});

And('I click on {string} link', (pageName) => {
	cy.clickContentsLink(pageName);
});

And('I click on search button', () => {
	projectAppDocs.clickOnSearch();
});

Then('below rows should be returned', (table) => {
	projectAppDocs.assertResultsPresentOnPage(table);
});

When('I enter text {string} into search field', (searchInput) => {
	projectAppDocs.enterTextIntoSearchField(searchInput);
});

And('I verify below pagination is present on the page', (table) => {
	projectAppDocs.assertIfPaginationIsPresent(table);
});

And('I navigate to page {string} of the results', (paginationLink) => {
	projectAppDocs.clickOnPaginationLink(paginationLink);
});

And('I verify text {string} is present on the page', (resultsText) => {
	projectAppDocs.assertDocumentResultsText(resultsText);
});

Then('I verify that only {string} results present on each page', (resultsPerPage) => {
	projectAppDocs.assertResultsPerPage(resultsPerPage);
});

And('I can verify that the project documents displayed in descending order', (table) => {
	projectAppDocs.verifyDocumentsDisplayedinDescendingOrder(table);
});

Then('I verify that no documents found text displayed on the page', () => {
	projectAppDocs.verifyNoDocsFoundText();
});

Then('I can verify that below project documents were returned', (table) => {
	projectAppDocs.verifyResultsReturned(table);
});

Then('I verify that no project application documents found text displayed on the page', () => {
	projectAppDocs.verifyNoProjectAppDocsFoundText();
});

Then('I verify that no search term documents found text displayed on the page', () => {
	projectAppDocs.verifyNoSearchTermDocsFoundText();
});

And('I click on clear search link', () => {
	projectAppDocs.clickOnClearSearch();
});

Then('all the filter stages should {string} by default', () => {
	projectAppDocs.assertFilterStagesNotPresent();
});

And('I click on {string} section', (caseCondition) => {
	projectAppDocs.clickSection(caseCondition);
});

Then(
	'I verify that the {string} section expanded with {int} filters',
	(sectionName, sectionLength) => {
		projectAppDocs.assertSectionLength(sectionName, sectionLength);
	}
);

And('I click on Apply button to apply filters', () => {
	projectAppDocs.clickApplyFilterButton();
});

And('I select {string} checkbox', (checkBoxName) => {
	projectAppDocs.selectCheckBox(checkBoxName);
});

And('I verify the filter {string} name is {string} {int}', (sectionName, label, sum) => {
	projectAppDocs.filterNameWithSumOfItems(sectionName, label, sum);
});
