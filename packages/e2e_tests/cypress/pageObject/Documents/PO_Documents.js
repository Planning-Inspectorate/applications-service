class PO_Documents {
	clickOnHerfProjectLink() {
		return cy.get("a[href='/projects/EN010021']").click(); // Dogger Bank Creyke project
	}

	documentsLink() {
		return cy.get("a[href='/projects/EN010021/documents']").click(); //
	}

	showHideAllFilters() {
		return cy.get('#show-hide-all-filters').click(); // Show & Hide all sections
	}

	selectAllFiters() {
		return cy.get('.ui-checkbox-accordion__checkboxes-section-switch'); // Select all filters link
	}

	filterResultsCaption() {
		return cy.get('.ui-tag-link-list__caption'); // Filter results caption
	}

	filterTitleLink() {
		return cy.get(
			'.ui-checkbox-accordion__section-control > .ui-checkbox-accordion__section-control-title'
		); // Section title link
	}

	sectionCheckBoxes() {
		return cy.get("div[class='govuk-checkboxes__item']"); // Section checkboxes
	}

	applyFilterButton() {
		return cy.get('[data-cy="apply-filter-button"]').click(); // Apply filter button
	}

	documentsListVisible() {
		return cy.get(
			'.section-results__result-meta-data > :nth-child(1) > [data-cy="published-date"]'
		);
	}
}

export default PO_Documents;
