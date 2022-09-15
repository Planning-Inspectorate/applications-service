class PO_ProjectAppDocs {
	enterTextIntoSearchField(inputData) {
		cy.get('#search').clear();
		if (inputData) {
			cy.get('#search').type(inputData);
		}
	}

	clickOnSearch() {
		cy.get('[data-cy="search-button"]').click();
	}

	assertResultsPresentOnPage(table) {
		const contents = table.hashes();
		for (var i = 0; i < contents.length; i++) {
			cy.confirmTextOnPage(contents[i].Data);
		}
	}

	assertIfPaginationIsPresent(table) {
		const contents = table.hashes();
		cy.get('.moj-pagination__item').each(($e1, index) => {
			const actualText = $e1.text();
			const expectedText = contents[index].Data;
			expect(actualText).to.contain(expectedText);
		});
	}

	clickOnPaginationLink(paginationLink) {
		cy.get('.moj-pagination__item').each(($e1, index) => {
			const text = $e1.text();

			if (text.includes(paginationLink)) {
				cy.get('.moj-pagination__item').eq(index).click();
			}
		});
	}

	assertDocumentResultsText(resultText) {
		cy.get('.moj-pagination__results').should('contain.text', resultText);
	}

	assertResultsPerPage(resultsPerPage) {
		cy.get('.ui-results-list__item').should('have.length', resultsPerPage);
	}

	verifyDocumentsDisplayedinDescendingOrder(table) {
		const contents = table.hashes();
		cy.get('[data-cy="published-date"]').each(($e1, index) => {
			const actualText = $e1.text();
			const expectedText = contents[index].Date;
			expect(actualText).to.contain(expectedText);
		});
		cy.get('[data-cy="published-stage"]').each(($e1, index) => {
			const actualText = $e1.text();
			const expectedText = contents[index].Stage;
			expect(actualText).to.contain(expectedText);
		});
		cy.get('[data-cy="published-title"]').each(($e1, index) => {
			const actualText = $e1.text();
			const expectedText = contents[index].Title;
			expect(actualText).to.contain(expectedText);
		});
	}

	verifyNoProjectAppDocsFoundText() {
		cy.get('[data-cy="no-docs-text"]').should(
			'contain.text',
			'There are no project application documents available to display at the moment.'
		);
	}

	verifyNoSearchTermDocsFoundText() {
		cy.get('[data-cy="no-docs-text"]').should(
			'contain.text',
			'No documents were found matching your search term and filters.'
		);
	}

	verifyResultsReturned(table) {
		const contents = table.hashes();
		cy.get('.ui-results-list__item').each(($e1, index) => {
			const actualText = $e1.text();
			const expectedText = contents[index].Document;
			expect(actualText.replace(/\s/g, '').trim()).to.contain(
				expectedText.replace(/\s/g, '').trim()
			);
		});
	}

	clickOnClearSearch() {
		cy.get('[data-cy="clear-search"]').click();
	}

	assertFilterStagesNotPresent() {
		switch (window.sessionStorage['accordion-default-content-1']) {
			case false:
				cy.get('.govuk-form-group').should('not.be.visible');
				break;
			case true:
				cy.get('.govuk-form-group').should('be.visible');
				break;
		}
	}

	clickSection(caseCondition) {
		switch (caseCondition) {
			case 'show all':
				cy.get('.govuk-accordion__show-all-text').click();
				break;
			case 'hide all':
				cy.get('.govuk-accordion__show-all-text').click();
				break;
			case 'project stage':
				cy.get('[data-cy="project-stage"]').click({ force: true });
				break;
			case 'document type':
				cy.get('[data-cy="document-type"]').click({ force: true });
				break;
		}
	}

	assertSectionLength(sectionName, sectionLength) {
		switch (sectionName) {
			case 'project stage':
				cy.get('[name="stage"]').should('have.length', sectionLength);
				break;
			case 'document type':
				cy.get('[name="type"]').should('have.length', sectionLength);
				break;
		}
	}

	clickApplyFilterButton() {
		cy.get('[data-cy="apply-filter-button"]').click();
	}

	selectCheckBox(checkBoxName) {
		window.sessionStorage['accordion-default-content-1'] = true;
		window.sessionStorage['accordion-default-content-2'] = true;
		cy.reload();
		cy.contains('label', checkBoxName)
			.invoke('attr', 'for')
			.then((id) => {
				cy.get('#' + id).click();
			});
	}
}
export default PO_ProjectAppDocs;
