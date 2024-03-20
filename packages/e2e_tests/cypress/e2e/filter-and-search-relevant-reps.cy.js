import { PO_RelevantReps } from '../pageObject/Relevant-representations/PO_RelevantReps';

const relevantReps = new PO_RelevantReps();

describe('User can view, filter and search the relevant reps page for a project', () => {
	it('should navigate to the relevant reps page for a project', () => {
		cy.clearCookies();
		cy.visit('/projects/EN010120/');
		relevantReps.clickRelevantRepsLink();
		cy.url().should('include', '/representations');
	});

	it('should display a list of 25 relevant representations', () => {
		relevantReps.returnListOfRepresentations().should('be.visible');
		relevantReps.returnListOfRepresentations().should('have.length', 25);
	});

	it('should navigate to page 2 of relevant reps', () => {
		relevantReps.navigateToPage('2');
		relevantReps.returnListOfRepresentations().should('be.visible');
	});

	it('can change the numbers of results per page to 50', () => {
		relevantReps.changeResultsPerPage('50');
		cy.url().should('include', 'itemsPerPage=50');
		relevantReps.returnListOfRepresentations().should('be.visible');
	});

	it('can apply a filter and see results', () => {
		relevantReps.checkFilter('Local Authorities');
		relevantReps.clickApplyFilters();
		relevantReps.returnListOfRepresentations().should('be.visible');
	});

	it('can uncheck the applied filter', () => {
		relevantReps.uncheckFilter('Local Authorities');
		relevantReps.clickApplyFilters();
		relevantReps.returnListOfRepresentations().should('be.visible');
	});

	it('can search for a relevant rep and see results', () => {
		relevantReps.enterSearchTerm('Planning');
		relevantReps.clickSearchButton();
		relevantReps.returnListOfRepresentations().should('be.visible');
	});

	it('can click through to view the first relevant rep', () => {
		relevantReps.clickFirstTitle();
		relevantReps.returnRepHeading().should('be.visible');
	});

	it('can navigate back to list of results', () => {
		relevantReps.clickBackToResults();
		relevantReps.returnListOfRepresentations().should('be.visible');
	});
});
