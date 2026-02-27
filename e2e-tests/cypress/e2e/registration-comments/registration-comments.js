import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import PO_RegComments from './PageObjects/PO_RegComments';
const regComments = new PO_RegComments();

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
	cy.visit('/project-search', { failOnStatusCode: false });
	cy.clickProjectLink(projectName);
	cy.clickContentsLink('Relevant representations (registration comments)');
});

When('I search for comments containing {string}', (searchInput) => {
	regComments.enterTextIntoSearchField(searchInput);
	regComments.submitSearch();
});

Then(
	'a list of registration comments with metadata containing {string} is provided',
	(searchInput) => {
		cy.get('[data-cy="representation"]').each((element) => {
			expect(element.text().toLowerCase()).to.contain(searchInput.toLowerCase());
		});
	}
);

Then('the list is sorted by received date, newest first', () => {
	const datesProvided = [];
	cy.get('[data-cy="published-date"]').each((element) => {
		datesProvided.push(Date.parse(element.text()));
	});
	const sortedDates = [...datesProvided];
	sortedDates.sort((a, b) => a - b).reverse();
	expect(datesProvided).to.deep.eq(sortedDates);
});

Then('I am informed that no results were found', () => {
	cy.get('p[data-cy="no-comments-found"]').should(
		'contain.text',
		'No results were found matching your search term or filters.'
	);
});

Then(
	'I am given the option to clear the search to list all available registration comments',
	() => {
		cy.get('a[data-cy="clear-search"]').should('contain.text', 'Clear');
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

Then('I click on back link', () => {
	cy.clickOnBackLink();
});
