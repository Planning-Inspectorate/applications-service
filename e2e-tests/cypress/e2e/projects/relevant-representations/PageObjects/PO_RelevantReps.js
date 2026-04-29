export class PO_RelevantReps {
	identifiers = {
		relevantRepsLink: () => cy.get('a[href*="/representations"]'),
		listOfRelevantReps: () => cy.get('[data-cy="representation"]'),
		paginationLink: () => cy.get('.moj-pagination__link'),
		resultsPerPage: (count) => cy.get(`a[href*="itemsPerPage=${count}"]`),
		searchInput: () => cy.get('#searchTerm'),
		searchButton: () => cy.get('[data-cy="search-button"]'),
		FilterOption: () => cy.get('[type="checkbox"]'),
		applyFilterButton: () => cy.get('[data-cy="apply-filter-button"]'),
		relevantRepTitle: () => cy.get('.ui-results__result-title-link'),
		relevanteRepHeading: () => cy.get('.govuk-heading-l'),
		backToResultsLink: () => cy.get('[data-cy="back"]'),
		noResultsMessage: () => cy.get('[data-cy="no-comments-found"]'),
		clearSearchLink: () => cy.get('[data-cy="clear-search"]')
	};

	get functions() {
		return new Proxy(
			{},
			{
				get: (_, prop) => {
					const value = this[prop];
					if (typeof value !== 'function') {
						throw new Error(`Function "${String(prop)}" was not found on ${this.constructor.name}`);
					}
					return value.bind(this);
				}
			}
		);
	}

	clickRelevantRepsLink(string) {
		this.identifiers.relevantRepsLink().contains(string).click();
	}

	returnListOfRepresentations() {
		return this.identifiers.listOfRelevantReps();
	}

	navigateToPage(string) {
		this.identifiers.paginationLink().contains(string).click();
	}

	changeResultsPerPage(string) {
		this.identifiers.resultsPerPage(string).click();
	}

	enterSearchTerm(string) {
		this.identifiers.searchInput().type(string);
	}

	clickSearchButton() {
		this.identifiers.searchButton().click();
	}

	checkFilter(string) {
		this.identifiers.FilterOption().check(string);
	}

	uncheckFilter(string) {
		this.identifiers.FilterOption().uncheck(string);
	}

	clickApplyFilters() {
		this.identifiers.applyFilterButton().click();
	}

	clickFirstTitle() {
		this.identifiers.relevantRepTitle().first().click();
	}

	returnRepHeading() {
		return this.identifiers.relevanteRepHeading();
	}

	clickBackToResults() {
		this.identifiers.backToResultsLink().click();
	}

	noResultsMessage() {
		return this.identifiers.noResultsMessage();
	}

	clickClearSearch() {
		this.identifiers.clearSearchLink().click();
	}
}
