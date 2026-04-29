class PO_DateFilter {
	identifiers = {
		datePublishedLink: () =>
			cy.contains('.ui-checkbox-accordion__section-switch-title', 'Date published'),
		fromDay: () => cy.get('#docments-page-date-from-form-group-day'),
		fromMonth: () => cy.get('#docments-page-date-from-form-group-month'),
		fromYear: () => cy.get('#docments-page-date-from-form-group-year'),
		toDay: () => cy.get('#docments-page-date-to-form-group-day'),
		toMonth: () => cy.get('#docments-page-date-to-form-group-month'),
		toYear: () => cy.get('#docments-page-date-to-form-group-year'),
		applyFilterButton: () => cy.get('[data-cy="apply-filter-button"]'),
		fromDateErrors: () => cy.get('#docments-page-date-from-form-group-error'),
		toDateErrors: () => cy.get('#docments-page-date-to-form-group-error'),
		filterResultIcon: () => cy.get('.ui-tag-link__text'),
		publishedDate: () => cy.get('[data-cy="published-date"]')
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

	datePublishedLink() {
		this.identifiers.datePublishedLink().click();
	}

	fromDay() {
		return this.identifiers.fromDay();
	}

	fromMonth() {
		return this.identifiers.fromMonth();
	}

	fromYear() {
		return this.identifiers.fromYear();
	}

	toDay() {
		return this.identifiers.toDay();
	}

	toMonth() {
		return this.identifiers.toMonth();
	}

	toYear() {
		return this.identifiers.toYear();
	}

	applyFilterBtn() {
		this.identifiers.applyFilterButton().click();
	}

	fromDateErrors() {
		return this.identifiers.fromDateErrors();
	}

	toDateErrors() {
		return this.identifiers.toDateErrors();
	}

	filterResultIcon() {
		return this.identifiers.filterResultIcon();
	}

	publishedDate() {
		return this.identifiers.publishedDate();
	}
}

export default PO_DateFilter;
