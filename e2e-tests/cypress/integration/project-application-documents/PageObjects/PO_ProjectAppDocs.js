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
        const contents = table.hashes()
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

    verifyDocumentsDisplayedinDescendingOrder(table) {
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
        cy.get('[data-cy="published-title"]').each(($e1, index) => {
            const actualText = $e1.text();
            const expectedText = contents[index].Title;
            expect(actualText).to.contain(expectedText);
        })
    }

    verifyNoDocsFoundText() {
        cy.get('[data-cy="no-docs-text"]').should('contain.text', "No documents were found matching your search terms.")
    }

    verifyResultsReturned(table) {
        const contents = table.hashes();
        cy.get('.pins-govuk-result-list__item').each(($e1, index) => {
            const actualText = $e1.text();
            const expectedText = contents[index].Document;
            expect(actualText.replace(/\s/g, "").trim()).to.contain(expectedText.replace(/\s/g, "").trim());
        })
    }

    clickOnClearSearch() {
        cy.get('[data-cy="clear-search"]').click();
    }

}
export default PO_ProjectAppDocs;