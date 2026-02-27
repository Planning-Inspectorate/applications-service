class PO_RegComments {
	enterTextIntoSearchField(inputData) {
		cy.get('#searchTerm').clear();
		if (inputData) {
			cy.get('#searchTerm').type(inputData);
		}
	}

	submitSearch() {
		cy.get('[data-cy="search-button"]').click();
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
		cy.get('[data-cy="representation"]').should('have.length', resultsPerPage);
	}

	assertNoRegCommentsOnThePage() {
		cy.get('[data-cy="no-comments-available"]').should(
			'contain.text',
			'The relevant representations for this project have been archived and are no longer available on this site.'
		);
	}

	verifyCommentsDisplayedinDescendingOrder(table) {
		const contents = table.hashes();
		cy.get('[data-cy="published-date"]').each(($e1, index) => {
			if (index >= contents.length) return;

			const actualText = $e1.text().trim();
			const expectedText = contents[index].Date;
			expect(actualText).to.contain(expectedText);
		});
		cy.get('[data-cy="published-stage"]').each(($e1, index) => {
			if (index >= contents.length) return;

			const actualText = $e1.text().trim();
			const expectedText = contents[index].Stage;
			expect(actualText).to.contain(expectedText);
		});
	}

	assertNoPagination() {
		cy.get('.moj-pagination__item').should('not.exist');
	}

	clickApplyFilterButton() {
		cy.get('[data-cy="apply-filter-button"]').click();
	}

	selectCheckBox(checkBoxName) {
		cy.contains('label', checkBoxName)
			.invoke('attr', 'for')
			.then((id) => {
				cy.get('#' + id).click();
			});
	}

	verifyResultsReturned(table) {
		const contents = table.hashes();
		cy.get('[data-cy="representation"]').each(($e1, index) => {
			const actualText = $e1.text();
			const expectedText = contents[index].Comments;
			expect(actualText.replace(/\s/g, '').trim()).to.contain(
				expectedText.replace(/\s/g, '').trim()
			);
		});
	}

	clickOnReadMoreLink(linkNum) {
		cy.get('[data-cy="read-more"]').each(($e1, index) => {
			if (linkNum === index) {
				cy.get('[data-cy="read-more"]')
					.eq(index - 1)
					.click();
			}
		});
	}

	verifyCommentIsPresent(table) {
		const contents = table.hashes();
		cy.get('[data-cy="representaion"] .pins-rte').each(($e1, index) => {
			const actualText = $e1.text();
			const expectedText = contents[index].Data;
			expect(actualText.replace(/\s/g, '').trim()).to.contain(
				expectedText.replace(/\s/g, '').trim()
			);
		});
	}
}
export default PO_RegComments;
