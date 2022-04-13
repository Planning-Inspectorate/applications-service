class PO_ProjectAppDocs {

    enterTextIntoSearchField(inputData) {
        cy.get('#search').type(inputData);
    }

    clickOnSearch() {
        cy.get('#toggleFilters').click();
    }

    assertResultsPresentOnPage(table) {
        const contents = table.hashes()
        for (var i = 0; i < contents.length; i++) {
            cy.confirmTextOnPage(contents[i].Data);
        }
    }

    assertIfPaginationIsPresent(table) {
        const contents = table.hashes();
        cy.get('.hmcts-pagination__item').each(($e1, index) => {
            const actualText = $e1.text();
            const expectedText = contents[index].Data;
            expect(actualText).to.contain(expectedText);
        })
    }

    clickOnPaginationLink(paginationLink) {
        cy.get('.hmcts-pagination__item').each(($e1, index) => {
            const text = $e1.text();

            if (text.includes(paginationLink)) {
                cy.get('.hmcts-pagination__item').eq(index).click();
            }
        })
    }

    assertDocumentResultsText(resultText) {
        cy.get('.hmcts-pagination__results').should('contain.text', resultText)
    }

    assertResultsPerPage(resultsPerPage) {
        cy.get('.pins-search-results-group').should('have.length', resultsPerPage)
    }

}
export default PO_ProjectAppDocs;