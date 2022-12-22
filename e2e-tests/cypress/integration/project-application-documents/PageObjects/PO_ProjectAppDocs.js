const accordionId = 'ui-checkbox-accordion__section-switch--';
const checkboxId = 'ui-checkbox-accordion__checkboxes-section--';

const filterKeys = {
	'pre-application': {
		accordionId: accordionId + 'stage-1',
		checkboxId: checkboxId + 'stage-1'
	},
	'developers-application': {
		accordionId: accordionId + "category-Developer's Application",
		checkboxId: checkboxId + "category-Developer's Application"
	},
	acceptance: {
		accordionId: accordionId + 'stage-2',
		checkboxId: checkboxId + 'stage-2'
	},
	'pre-examination': {
		accordionId: accordionId + 'stage-3',
		checkboxId: checkboxId + 'stage-3'
	},
	examination: {
		accordionId: accordionId + 'stage-4',
		checkboxId: checkboxId + 'stage-4'
	},
	recommendation: {
		accordionId: accordionId + 'stage-5',
		checkboxId: checkboxId + 'stage-5'
	},
	decision: {
		accordionId: accordionId + 'stage-6',
		checkboxId: checkboxId + 'stage-6'
	},
	'post-decision': {
		accordionId: accordionId + 'stage-7',
		checkboxId: checkboxId + 'stage-7'
	}
};

class PO_ProjectAppDocs {
	enterTextIntoSearchField(inputData) {
		cy.get('#searchTerm').clear();
		if (inputData) {
			cy.get('#searchTerm').type(inputData);
		}
	}

	clickOnSearch() {
		cy.get('#search-button').click();
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
		cy.get('.section-results').find('li').should('have.length', resultsPerPage);
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
		cy.get('.section-results')
			.find('li')
			.each(($e1, index) => {
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
		if (caseCondition === 'show all' || caseCondition === 'hide all')
			cy.get('#show-hide-all-filters').click();
		else if (Object.hasOwn(filterKeys, caseCondition))
			cy.get(`[id="${filterKeys[caseCondition].accordionId}"]`).click({ force: true });
		else throw new Error(`Test failed: is the filter ${caseCondition} in filterKeys`);
	}

	assertSectionLength(sectionName, sectionLength) {
		if (Object.hasOwn(filterKeys, sectionName))
			cy.get(`[id="${filterKeys[sectionName].checkboxId}"]`)
				.find('.govuk-checkboxes__item')
				.should('have.length', sectionLength);
		else throw new Error(`Test failed: is the filter ${sectionName} in filterKeys`);
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

	filterNameWithSumOfItems(sectionName, label, sum) {
		cy.get(`[for="${filterKeys[sectionName].accordionId}"]`).contains(`${label} (${sum})`);
	}
}

export default PO_ProjectAppDocs;
