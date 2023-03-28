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

		cy.get('.section-results > li').each(($e1, index) => {
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
		else if (Object.hasOwnProperty.call(filterKeys, caseCondition))
			cy.get('summary').eq(filterKeys[caseCondition].accordionIndex).click({ force: true });
		else throw new Error(`Test failed: is the filter ${caseCondition} in filterKeys`);
	}

	assertSectionLength(sectionName, sectionLength) {
		if (Object.hasOwnProperty.call(filterKeys, sectionName))
			cy.get(`[id="${filterKeys[sectionName].checkboxId}"]`)
				.find('.govuk-checkboxes__item')
				.should('have.length', sectionLength);
		else throw new Error(`Test failed: is the filter ${sectionName} in filterKeys`);
	}

	clickApplyFilterButton() {
		cy.get('[data-cy="apply-filter-button"]').click();
	}

	selectCheckBox(checkBoxName) {
		cy.get(`[id="${checkBoxName}"]`).check();
	}

	filterNameWithSumOfItems(sectionName, label, sum) {
		cy.get('details').contains(`${label} (${sum})`);
	}
}

export default PO_ProjectAppDocs;
