class PO_Documents {
	clickOnHerfProjectLink() {
		return cy.get("a[href='/projects/EN010021']").click(); // Dogger Bank Creyke project
	}

	documentsLink() {
		return cy.get("a[href='/projects/EN010021/documents']").click();
	}

	preAppFilter() {
		return cy
			.get(
				':nth-child(1) > .ui-checkbox-accordion__section-control > .ui-checkbox-accordion__section-control-title'
			)
			.click();
	}

	preAppFilterCheckBox_1() {
		return cy.get('#stage-1').check(); // Filter checkbox
	}

	preAppFilterCheckBox_2() {
		return cy.get('#stage-1-2').check(); // Filter checkbox
	}

	applyFilterButton() {
		return cy.get('[data-cy="apply-filter-button"]').click(); // Apply filter button
	}

	preAppFilteText() {
		return cy.get('[data-cy="published-stage"]'); // "Pre-application" text is present
	}

	documentsVisible() {
		return cy.get('.section-results__result-link'); // Documents present
	}
}

export default PO_Documents;
