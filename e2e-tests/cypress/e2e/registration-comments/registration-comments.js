import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import PO_RegComments from './PageObjects/PO_RegComments';
const regComments = new PO_RegComments();

Given('I navigate to {string} project Overview page', (projectName) => {
	regComments.openProjectOverview(projectName);
});

And('I click on {string} link', (pageName) => {
	regComments.clickContentsLink(pageName);
});

And('I verify below pagination is present on the page', (table) => {
	regComments.assertIfPaginationIsPresent(table);
});

And('I navigate to page {string} of the results', (paginationLink) => {
	regComments.clickOnPaginationLink(paginationLink);
});

And('I verify text {string} is present on the page', (resultsText) => {
	regComments.assertDocumentResultsText(resultsText);
});

Then('I verify that only {string} results present on each page', (resultsPerPage) => {
	regComments.assertResultsPerPage(resultsPerPage);
});

Then('I verify no registration comments text present on the page', () => {
	regComments.assertNoRegCommentsOnThePage();
});

Then(
	'I can verify that the registration comments displayed in descending order by date submitted and secondary alphabetical order of author',
	(table) => {
		regComments.verifyCommentsDisplayedinDescendingOrder(table);
	}
);

Then('I verify no pagination is present on the page', () => {
	regComments.assertNoPagination();
});

Given('I have navigated to registration comments for the {string} project', (projectName) => {
	regComments.openRegistrationComments(projectName);
});

When('I search for comments containing {string}', (searchInput) => {
	regComments.enterTextIntoSearchField(searchInput);
	regComments.submitSearch();
});

Then(
	'a list of registration comments with metadata containing {string} is provided',
	(searchInput) => {
		regComments.assertSearchResultsContain(searchInput);
	}
);

Then('the list is sorted by received date, newest first', () => {
	regComments.assertSortedByReceivedDate();
});

Then('I am informed that no results were found', () => {
	regComments.assertNoResultsFound();
});

Then(
	'I am given the option to clear the search to list all available registration comments',
	() => {
		regComments.assertClearSearchOption();
	}
);

And('I click on Apply button to apply filters', () => {
	regComments.clickApplyFilterButton();
});

And('I select {string} checkbox', (checkBoxName) => {
	regComments.selectCheckBox(checkBoxName);
});

Then('I can verify that below comments were returned', (table) => {
	regComments.verifyResultsReturned(table);
});

And('I click on {int} read more link', (linkNum) => {
	regComments.clickOnReadMoreLink(linkNum);
});

Then('I verify below comment is displayed', (table) => {
	regComments.verifyCommentIsPresent(table);
});

Then('I can view the registration comment detail page', () => {
	regComments.verifyCommentDetailPage();
});

Then('I click on back link', () => {
	regComments.returnToList();
});

Then('I return to the registration comments list', () => {
	regComments.assertReturnedToList();
});
