export class PO_Documents {
	elements = {
		listOfDocuments: () => cy.get('ul.section-results').children(),
		numberOfResults: () => cy.get('.govuk-link'),
		expandFilterOption: () => cy.get('.ui-checkbox-accordion__section-switch-title'),
		enterSearchText: () => cy.get('input[name="searchTerm"]'),
		searchButton: () => cy.get('#search-button').contains('Search'),
		govSectionResults: () => cy.get('.section-results'),
		resultsPanel: () => cy.get('.ui-results')
	};

	returnListOfDocuments() {
		return this.elements.listOfDocuments();
	}

	chooseNumberOfResults(string) {
		this.elements.numberOfResults().contains(string).click();
	}

	expandFilterOptions(string) {
		this.elements.expandFilterOption().contains(string).click();
	}

	searchDocuments(text) {
		this.elements.enterSearchText().type(text);
	}

	clickSearchButton() {
		this.elements.searchButton().click();
	}

	checkFirstResultContainsString(string) {
		cy.get('.section-results__result').find('a').contains(string);
	}

	verifyResultStructure() {
		cy.get('.section-results__result').each((result) => {
			cy.wrap(result).find('p').should('exist').and('be.visible');
			cy.wrap(result)
				.find('.section-results__result-link')
				.should('exist')
				.and('have.attr', 'href')
				.then((href) => {
					expect(href).to.contain('/published-documents/');

					cy.wrap(result).find('[data-cy="published-date"]').should('exist').and('be.visible');
					cy.wrap(result).find('[data-cy="published-stage"]').should('exist').and('be.visible');
					cy.wrap(result).find('[data-cy="published-title"]').should('exist').and('be.visible');
				});
		});
	}

	sectionResultsVisible() {
		this.elements.govSectionResults().should('be.visible');
	}

	assertRelatedGuidesMenu(ariaLabel) {
		cy.get(`nav[aria-label="${ariaLabel}"]`)
			.should('exist')
			.and('be.visible')
			.find('h2')
			.should('contain', 'Related guides')
			.and('be.visible');
	}

	assertRelatedGuidesMenuItems(ariaLabel) {
		cy.get(`nav[aria-label="${ariaLabel}"]`)
			.find('.ui-vertical-tabs__list-item')
			.each((listItem) => {
				cy.wrap(listItem).find('a').should('have.attr', 'href').and('not.be.empty');
			});
	}

	assertFilterMenu(h3Text) {
		cy.get('#documents-page-filters')
			.should('exist')
			.and('be.visible')
			.within(() => {
				cy.get('h3').should('exist').and('contain.text', h3Text);
				cy.get('[data-cy="apply-filter-button"]').should('be.visible');
			});
	}
}
