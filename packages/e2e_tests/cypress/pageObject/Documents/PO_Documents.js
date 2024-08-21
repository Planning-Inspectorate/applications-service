export class PO_Documents {
	elements = {
		listOfDocuments: () => cy.get('ul.section-results').children(),
		numberOfResults: () => cy.get('.govuk-link'),
		expandFilterOption: () => cy.get('.ui-checkbox-accordion__section-switch-title'),
		selectFilter: (id) => cy.get(`#${id}`),
		enterSearchText: () => cy.get('input[name="searchTerm"]'),
		searchButton: () => cy.get('#search-button').contains('Search')
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

	findAndSelectFilter(id) {
		this.elements.selectFilter(id).click();
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

	searchDocuments(text) {
		this.elements.enterSearchText().type(text);
	}

	clickSearchButton() {
		this.elements.searchButton().click();
	}

	checkFirstResultContainsString(string) {
		cy.get('.section-results__result').find('a').contains(string);
	}
}
