export class PO_Section51 {
	elements = {
		section51Link: () => cy.get('.ui-vertical-tabs__list-item').contains('Section 51 advice'),
		section51H1: () => cy.get('.govuk-heading-xl').contains('Section 51 Advice'),
		changeResultsPerPage: () => cy.get('.govuk-link'),
		searchInput: () => cy.get('#searchTerm'),
		firstResult: () => cy.get('.section-results__result-link ').first()
	};

	clickSection51Link() {
		this.elements.section51Link().click();
	}

	checkMainH1Visible() {
		this.elements.section51H1().should('be.visible');
	}

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
