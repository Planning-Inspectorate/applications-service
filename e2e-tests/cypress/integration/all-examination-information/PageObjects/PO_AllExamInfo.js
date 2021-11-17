class PO_AllExamInfo {

    enterTextIntoSearchField(inputData) {
        cy.get('#search_documents').type(inputData);
    }

    clickOnSearch() {
        cy.get('button.search-documents-submit').click();
    }

    assertResultsPresentOnPage(table) {
        const contents = table.hashes()
        cy.confirmTextOnPage(contents[0].Data);
        cy.confirmTextOnPage(contents[1].Data);
        cy.confirmTextOnPage(contents[2].Data);
        cy.confirmTextOnPage(contents[3].Data);
    }

    assertResultsSortedByIsPresent() {
        cy.get('select#document-results-sort option:selected').should('have.text', 'Recently updated');
    }

}
export default PO_AllExamInfo;