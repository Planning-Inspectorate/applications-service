export class PO_RelevantReps {
	elements = {
		relevantRepsLink: () => cy.get('a[href*="/representations"]'),
		listOfRelevantReps: () => cy.get('[data-cy="representation"]'),
		paginationLink: () => cy.get('.moj-pagination__link'),
		resultsPerPage: () => cy.get('.govuk-link'),
		searchInput: () => cy.get('#searchTerm'),
		searchButton: () => cy.get('[data-cy="search-button"]'),
		FilterOption: () => cy.get('[type="checkbox"]'),
		applyFilterButton: () => cy.get('[data-cy="apply-filter-button"]'),
		relevantRepTitle: () => cy.get('.ui-results__result-title-link'),
		relevanteRepHeading: () => cy.get('.govuk-heading-l'),
		backToResultsLink: () => cy.get('[data-cy="back')
	};

	clickRelevantRepsLink(string) {
		this.elements.relevantRepsLink().contains(string).click();
	}

	returnListOfRepresentations() {
		return this.elements.listOfRelevantReps();
	}

	navigateToPage(string) {
		this.elements.paginationLink().contains(string).click();
	}

	changeResultsPerPage(string) {
		this.elements.resultsPerPage().contains(string).click();
	}

	enterSearchTerm(string) {
		this.elements.searchInput().type(string);
	}

	clickSearchButton() {
		this.elements.searchButton().click();
	}

	checkFilter(string) {
		this.elements.FilterOption().check(string);
	}

	uncheckFilter(string) {
		this.elements.FilterOption().uncheck(string);
	}

	clickApplyFilters() {
		this.elements.applyFilterButton().click();
	}

	clickFirstTitle() {
		this.elements.relevantRepTitle().first().click();
	}

	returnRepHeading() {
		return this.elements.relevanteRepHeading();
	}

	clickBackToResults() {
		this.elements.backToResultsLink().click();
	}
}
