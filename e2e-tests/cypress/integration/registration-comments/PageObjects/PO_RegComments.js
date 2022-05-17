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
        })
    }

    clickOnPaginationLink(paginationLink) {
        cy.get('.moj-pagination__item').each(($e1, index) => {
            const text = $e1.text();

            if (text.includes(paginationLink)) {
                cy.get('.moj-pagination__item').eq(index).click();
            }
        })
    }

    assertDocumentResultsText(resultText) {
        cy.get('.moj-pagination__results').should('contain.text', resultText)
    }

    assertResultsPerPage(resultsPerPage) {
        cy.get('.pins-govuk-result-list__item').should('have.length', resultsPerPage)
    }

    assertNoRegCommentsOnThePage() {
        cy.get('[data-cy="no-comments-available"]').should('contain.text', "There are no registration comments to display. Registration comments will be published after the registration period has closed.")
    }

    verifyCommentsDisplayedinDescendingOrder(table) {
        const contents = table.hashes();
        cy.get('[data-cy="published-date"]').each(($e1, index) => {
            const actualText = $e1.text();
            const expectedText = contents[index].Date;
            expect(actualText).to.contain(expectedText);
        })
        cy.get('[data-cy="published-stage"]').each(($e1, index) => {
            const actualText = $e1.text();
            const expectedText = contents[index].Stage;
            expect(actualText).to.contain(expectedText);
        })
    }

    assertNoPagination() {
        cy.get('.moj-pagination__item').should('not.exist');
    }

}
export default PO_RegComments;
