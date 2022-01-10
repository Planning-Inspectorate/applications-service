class PO_OverviewPage {

    enterTextIntoSearchField(inputData) {
        cy.get('#search').type(inputData);
    }

    clickOnSearch() {
        cy.get('#toggleFilters').click();
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

    clickOnApplyFilters() {
        
    }

}
export default PO_OverviewPage;