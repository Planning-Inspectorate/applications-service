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
	} //  the Pre-application filter

	showAllFilterLink() {
		return cy.get('#show-hide-all-filters').click({ force: true });
	}

	selectAllFilterLink() {
		return cy
			.get("div[id='ui-checkbox-accordion__checkboxes-section--stage-1'] button[type='button']")
			.click({ force: true });
	}

	preAppFilterCheckBox_1() {
		return cy.get('#stage-1').check(); // Filter checkbox
	}

	preAppFilterCheckBox_2() {
		return cy.get('#stage-1-2').check(); // Filter checkbox
	}

	devAppCheckBox_1() {
		return cy.get("#category-Developer's Application-3").check(); //Developer's Application checkbox
	}

	acceptanceCheckBox_1() {
		return cy.get('#stage-2-2').check(); // Acceptance checkbox
	}

	preExamCheckBox_1() {
		return cy.get('#stage-3').check(); // Pre-examination checkbox
	}

	examCheckBox_1() {
		return cy.get('#stage-4').check(); // Examination checkbox
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
