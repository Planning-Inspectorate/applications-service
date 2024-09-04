export class PO_Section51 {
	elements = {
		changeResultsPerPage: () => cy.get('.govuk-link'),
		searchInput: () => cy.get('#searchTerm'),
		firstResult: () => cy.get('.section-results__result-link').first()
	};

	changeNumberOfResults(string) {
		this.elements.changeResultsPerPage().contains(string).click();
	}

	enterSearchTerm(string) {
		this.elements.searchInput().type(string);
	}

	clickFirstResult() {
		this.elements.firstResult().click();
	}
}
