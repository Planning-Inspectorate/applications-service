class PO_DateFilter {
	datePublishedLink() {
		return cy
			.get(
				':nth-child(15) > .ui-checkbox-accordion__section-control > .ui-checkbox-accordion__section-control-title'
			)
			.click();
	}

	// From date published box

	fromDay() {
		return cy.get('#docments-page-date-from-form-group-day');
	}
	fromMonth() {
		return cy.get('#docments-page-date-from-form-group-month');
	}
	fromYear() {
		return cy.get('#docments-page-date-from-form-group-year');
	}

	//To date publish box

	toDay() {
		return cy.get('#docments-page-date-to-form-group-day');
	}

	toMonth() {
		return cy.get('#docments-page-date-to-form-group-month');
	}

	toYear() {
		return cy.get('#docments-page-date-to-form-group-year');
	}

	applyFilterBtn() {
		return cy.get('[data-cy="apply-filter-button"]').click();
	}

	filterResultIcon() {
		return cy.get('[data-cy="ui-tag-link"]'); // Fitler result icon
	}

	publishedDate() {
		return cy.get('[data-cy="published-date"]'); // Published date
	}

	fromDateErrors() {
		return cy.get('#docments-page-date-from-form-group-error');
	}

	toDateErrors() {
		return cy.get('#docments-page-date-to-form-group-error');
	}
}

export default PO_DateFilter;
