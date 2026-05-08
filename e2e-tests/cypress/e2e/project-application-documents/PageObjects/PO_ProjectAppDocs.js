import PageObject from '../../PageObject';

const checkboxId = 'ui-checkbox-accordion__checkboxes-section--';

const filterKeys = {
	'pre-application': {
		accordionIndex: 0,
		checkboxId: checkboxId + '1'
	},
	'developers-application': {
		accordionIndex: 1,
		checkboxId: checkboxId + '2'
	},
	acceptance: {
		accordionIndex: 2,
		checkboxId: checkboxId + '3'
	},
	'pre-examination': {
		accordionIndex: 3,
		checkboxId: checkboxId + '4'
	},
	examination: {
		accordionIndex: 4,
		checkboxId: checkboxId + '5'
	},
	recommendation: {
		accordionIndex: 5,
		checkboxId: checkboxId + '6'
	},
	decision: {
		accordionIndex: 6,
		checkboxId: checkboxId + '7'
	},
	'post-decision': {
		accordionIndex: 7,
		checkboxId: checkboxId + '8'
	}
};

class PO_ProjectAppDocs extends PageObject {
	identifiers = {
		...this.identifiers,
		searchField: () => cy.get('#searchTerm'),
		searchButton: () => cy.get('#search-button'),
		pagination: () => cy.get('.moj-pagination'),
		paginationItems: () => cy.get('.moj-pagination__item'),
		paginationResults: () => cy.get('.moj-pagination__results'),
		sectionResults: () => cy.get('.section-results'),
		publishedDates: () => cy.get('[data-cy="published-date"]'),
		publishedStages: () => cy.get('[data-cy="published-stage"]'),
		publishedTitles: () => cy.get('[data-cy="published-title"]'),
		noDocumentsText: () => cy.get('[data-cy="no-docs-text"]'),
		clearSearchButton: () => cy.get('[data-cy="clear-search"]'),
		filterGroups: () => cy.get('.govuk-form-group'),
		applyFilterButton: () => cy.get('[data-cy="apply-filter-button"]'),
		resultItems: () => cy.get('.section-results > li'),
		showHideAllFiltersButton: () => cy.get('#show-hide-all-filters'),
		filterSummaryByIndex: (accordionIndex) => cy.get('summary').eq(accordionIndex),
		filterSection: (sectionName) => cy.get(`[id="${filterKeys[sectionName].checkboxId}"]`),
		filterCheckbox: (checkBoxName) => cy.get(`[id="${checkBoxName}"]`),
		filterDetails: () => cy.get('details')
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

	clickOnSearch() {
		this.identifiers.searchButton().click();
	}

	openProjectOverview(projectName) {
		cy.visit('/project-search');
		if (projectName.includes('Ho Ho Hooo')) {
			cy.visit('/projects/TR033002');
			return;
		}

		this.clickProjectLink(projectName);
	}

	clickContentsNavigationLink(pageName) {
		this.clickContentsLink(pageName);
	}

	assertResultsPresentOnPage(table) {
		const contents = table.hashes();
		for (var i = 0; i < contents.length; i++) {
			cy.confirmTextOnPage(contents[i].Data);
		}
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
			.sectionResults()
			.find('li')
			.its('length')
			.should('be.gte', 1)
			.and('be.lte', maxResultsPerPage);
	}

	verifyDocumentsDisplayedinDescendingOrder() {
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
		this.identifiers.publishedTitles().its('length').should('be.gte', 1);
	}

	verifyNoProjectAppDocsFoundText() {
		this.identifiers
			.noDocumentsText()
			.should(
				'contain.text',
				'There are no project application documents available to display at the moment.'
			);
	}

	verifyNoSearchTermDocsFoundText() {
		this.identifiers
			.noDocumentsText()
			.should('contain.text', 'No results were found matching your search term or filters.');
	}

	verifyResultsReturned(table) {
		const contents = table.hashes();

		this.identifiers.resultItems().each(($e1, index) => {
			const actualText = $e1.text();

			if (!contents[index].Document) throw new Error(`No Document supplied`);
			if (!contents[index].Date)
				throw new Error(`No Date (Index - ${index}, Document - ${contents[index].Document})`);
			if (!contents[index].Stage)
				throw new Error(`No Stage (Index - ${index}, Document - ${contents[index].Document})`);
			if (!contents[index].Title)
				throw new Error(`No Title (Index - ${index}, Document - ${contents[index].Document})`);
			//  Document
			expect(actualText.replace(/\s/g, '').trim()).to.contain(
				contents[index].Document.replace(/\s/g, '').trim()
			);
			//  Date
			expect(actualText.replace(/\s/g, '').trim()).to.contain(
				contents[index].Date.replace(/\s/g, '').trim()
			);
			//  Stage
			expect(actualText.replace(/\s/g, '').trim()).to.contain(
				contents[index].Stage.replace(/\s/g, '').trim()
			);
			//  Title
			expect(actualText.replace(/\s/g, '').trim()).to.contain(
				contents[index].Title.replace(/\s/g, '').trim()
			);
		});
	}

	clickOnClearSearch() {
		this.identifiers.clearSearchButton().click();
	}

	assertFilterStagesNotPresent() {
		switch (window.sessionStorage['accordion-default-content-1']) {
			case false:
				this.identifiers.filterGroups().should('not.be.visible');
				break;
			case true:
				this.identifiers.filterGroups().should('be.visible');
				break;
		}
	}

	clickSection(caseCondition) {
		if (caseCondition === 'show all' || caseCondition === 'hide all')
			this.identifiers.showHideAllFiltersButton().click();
		else if (Object.hasOwnProperty.call(filterKeys, caseCondition))
			this.identifiers.filterSummaryByIndex(filterKeys[caseCondition].accordionIndex).click({
				force: true
			});
		else throw new Error(`Test failed: is the filter ${caseCondition} in filterKeys`);
	}

	assertSectionLength(sectionName, sectionLength) {
		if (Object.hasOwnProperty.call(filterKeys, sectionName))
			this.identifiers
				.filterSection(sectionName)
				.find('.govuk-checkboxes__item')
				.should('have.length', sectionLength);
		else throw new Error(`Test failed: is the filter ${sectionName} in filterKeys`);
	}

	clickApplyFilterButton() {
		this.identifiers.applyFilterButton().click();
	}

	selectCheckBox(checkBoxName) {
		this.identifiers.filterCheckbox(checkBoxName).check();
	}

	filterNameWithSumOfItems(sectionName, label, sum) {
		this.identifiers.filterDetails().contains(`${label} (${sum})`);
	}
}

export default PO_ProjectAppDocs;
