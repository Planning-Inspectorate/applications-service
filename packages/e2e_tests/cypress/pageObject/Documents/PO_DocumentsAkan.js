export class PO_Documents {
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

	returnListOfDocuments() {
		return cy.get('ul.section-results').children();
	}

	chooseNumberOfResults(string) {
		cy.get('.govuk-link').contains(string).click();
	}

	expandFilterOptions(string) {
		cy.get('.ui-checkbox-accordion__section-switch-title').contains(string).click();
	}

	findAndSelectFilter(id) {
		cy.get(`#${id}`).click();
	}

	// The methods below get all published titles for a set of search results and then assert that those titles match whatever we specify

	getAllPublishedTitlesElems() {
		return cy.get('[data-cy="published-title"]');
	}

	checkPublishedTitles(publishedTitle) {
		this.getAllPublishedTitlesElems().then((elements) => {
			const titles = [];
			cy.wrap(elements)
				.each((elem) => titles.push(elem.text().trim()))
				.then(() => {
					const matches = publishedTitle.every((title) => titles.includes(title));
					console.log(titles);
					console.log(publishedTitle);
					expect(matches).to.eq(true);
				});
		});
	}

	clearAllFilters() {
		cy.contains('Clear all filters').click();
	}

	searchDocuments(text) {
		//cy.wait(3000)
		cy.get('input[name="searchTerm"]').type(text);
	}
}
