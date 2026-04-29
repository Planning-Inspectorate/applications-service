class PO_RegComments {
	identifiers = {
		searchField: () => cy.get('#searchTerm'),
		searchButton: () => cy.get('[data-cy="search-button"]'),
		pagination: () => cy.get('.moj-pagination'),
		paginationItems: () => cy.get('.moj-pagination__item'),
		paginationResults: () => cy.get('.moj-pagination__results'),
		representations: () => cy.get('[data-cy="representation"]'),
		noCommentsAvailable: () => cy.get('[data-cy="no-comments-available"]'),
		publishedDates: () => cy.get('[data-cy="published-date"]'),
		publishedStages: () => cy.get('[data-cy="published-stage"]'),
		applyFilterButton: () => cy.get('[data-cy="apply-filter-button"]'),
		readMoreLinks: () => cy.get('[data-cy="read-more"]'),
		representationBodies: () => cy.get('[data-cy="representation"] .pins-rte'),
		filterLabel: (checkBoxName) => cy.contains('label', checkBoxName),
		filterOptionById: (id) => cy.get(`#${id}`)
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

	enterTextIntoSearchField(inputData) {
		this.identifiers.searchField().clear();
		if (inputData) {
			this.identifiers.searchField().type(inputData);
		}
	}

	submitSearch() {
		this.identifiers.searchButton().click();
	}

	assertIfPaginationIsPresent(table) {
		const contents = table.hashes();
		this.identifiers
			.pagination()
			.invoke('text')
			.then((paginationText) => {
				const normalizedPaginationText = paginationText.replace(/\s+/g, ' ').trim();
				contents.forEach(({ Data }) => {
					expect(normalizedPaginationText).to.include(Data);
				});
			});
	}

	clickOnPaginationLink(paginationLink) {
		cy.contains('.moj-pagination a', paginationLink).click();
	}

	assertDocumentResultsText() {
		this.identifiers
			.paginationResults()
			.should('contain.text', 'Showing')
			.and('contain.text', 'results');
	}

	assertResultsPerPage(resultsPerPage) {
		const maxResultsPerPage = Number(resultsPerPage);
		this.identifiers
			.representations()
			.its('length')
			.should('be.gte', 1)
			.and('be.lte', maxResultsPerPage);
	}

	assertNoRegCommentsOnThePage() {
		this.identifiers
			.noCommentsAvailable()
			.should(
				'contain.text',
				'The relevant representations for this project have been archived and are no longer available on this site.'
			);
	}

	verifyCommentsDisplayedinDescendingOrder() {
		this.identifiers.publishedDates().then(($dates) => {
			const extractedDates = [...$dates]
				.map((date) => date.textContent.match(/\d{1,2}\s+[A-Za-z]+\s+\d{4}/)?.[0])
				.filter(Boolean)
				.map((date) => Date.parse(date));

			expect(extractedDates.length).to.be.gte(1);
			for (let index = 1; index < extractedDates.length; index += 1) {
				expect(extractedDates[index]).to.be.at.most(extractedDates[index - 1]);
			}
		});
		this.identifiers.publishedStages().its('length').should('be.gte', 1);
	}

	assertNoPagination() {
		this.identifiers.paginationItems().should('not.exist');
	}

	clickApplyFilterButton() {
		this.identifiers.applyFilterButton().click();
	}

	selectCheckBox(checkBoxName) {
		this.identifiers
			.filterLabel(checkBoxName)
			.invoke('attr', 'for')
			.then((id) => {
				this.identifiers.filterOptionById(id).click();
			});
	}

	verifyResultsReturned(table) {
		const contents = table.hashes();
		this.identifiers.representations().each(($e1, index) => {
			const actualText = $e1.text();
			const expectedText = contents[index].Comments;
			expect(actualText.replace(/\s/g, '').trim()).to.contain(
				expectedText.replace(/\s/g, '').trim()
			);
		});
	}

	clickOnReadMoreLink(linkNum) {
		this.identifiers.readMoreLinks().eq(linkNum).click();
	}

	verifyCommentIsPresent(table) {
		const contents = table.hashes();
		this.identifiers.representationBodies().each(($e1, index) => {
			const actualText = $e1.text();
			const expectedText = contents[index].Data;
			expect(actualText.replace(/\s/g, '').trim()).to.contain(
				expectedText.replace(/\s/g, '').trim()
			);
		});
	}

	verifyCommentDetailPage() {
		cy.get('[data-cy="back"]').should('contain.text', 'Back to list');
		cy.get('h1').should('be.visible');
		cy.get('.govuk-summary-list').should('be.visible');
		this.identifiers
			.representationBodies()
			.invoke('text')
			.then((text) => {
				expect(text.trim().length).to.be.greaterThan(0);
			});
	}
}
export default PO_RegComments;
