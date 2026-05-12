import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { PO_RelevantReps } from '../PageObjects/PO_RelevantReps';
import { LOCAL_CASES } from '../../shared/localCases';

const relevantReps = new PO_RelevantReps();
const { stJamesBarton } = LOCAL_CASES;

Given('I open the local relevant representations page', () => {
	relevantReps.openLocalRelevantRepresentationsPage(stJamesBarton.id);
	relevantReps.assertRelevantRepresentationsHeading();
});

Then('relevant representations are displayed on the first page', () => {
	relevantReps.returnListOfRepresentations().should('be.visible');
	relevantReps.returnListOfRepresentations().its('length').should('be.within', 1, 25);
});

When('I open page {string} of relevant representations', (pageNumber) => {
	relevantReps.navigateToPage(pageNumber);
});

Then('relevant representations are displayed', () => {
	relevantReps.returnListOfRepresentations().should('be.visible');
});

When('I change relevant representation results per page to {string}', (count) => {
	relevantReps.changeResultsPerPage(count);
});

Then('the relevant representations url includes {string}', (value) => {
	relevantReps.assertUrlIncludes(value);
});

When('I apply the {string} relevant representation filter', (filterName) => {
	relevantReps.checkFilter(filterName);
	relevantReps.clickApplyFilters();
});

When('I remove the {string} relevant representation filter', (filterName) => {
	relevantReps.uncheckFilter(filterName);
	relevantReps.clickApplyFilters();
});

When('I search relevant representations for {string}', (searchTerm) => {
	relevantReps.enterSearchTerm(searchTerm);
	relevantReps.clickSearchButton();
});

Then('the no relevant representations results message is displayed', () => {
	relevantReps.noResultsMessage().should('be.visible');
});

When('I clear the relevant representations search', () => {
	relevantReps.clickClearSearch();
});

When('I open the first relevant representation', () => {
	relevantReps.clickFirstTitle();
});

Then('the relevant representation detail page is displayed', () => {
	relevantReps.returnRepHeading().should('be.visible');
});

When('I return to the relevant representations results', () => {
	relevantReps.clickBackToResults();
});
