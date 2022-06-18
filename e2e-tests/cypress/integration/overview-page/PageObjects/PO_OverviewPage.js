class PO_OverviewPage {
	enterTextIntoSearchField(inputData) {
		cy.get('#search').type(inputData);
	}

	clickOnSearch() {
		cy.get('#toggleFilters').click();
	}

	assertResultsPresentOnPage(table) {
		const contents = table.hashes();
		for (var i = 0; i < contents.length; i++) {
			cy.confirmTextOnPage(contents[i].Data);
		}
	}

	assertResultsSortedByIsPresent() {
		cy.get('select#document-results-sort option:selected').should('have.text', 'Recently updated');
	}

	clickOnApplyFilters() {}
}
export default PO_OverviewPage;
