import PageObject from '../../PageObject';

class PO_OverviewPage extends PageObject {
	identifiers = {
		...this.identifiers,
		searchField: () => cy.get('#search'),
		documentResultsSort: () => cy.get('select#document-results-sort option:selected')
	};

	get functions() {
		return new Proxy(
			{},
			{
				get: (_, prop) => this[prop].bind(this)
			}
		);
	}

	enterTextIntoSearchField(inputData) {
		this.identifiers.searchField().type(inputData);
	}

	assertResultsPresentOnPage(table) {
		const contents = table.hashes();
		for (var i = 0; i < contents.length; i++) {
			cy.confirmTextOnPage(contents[i].Data);
		}
	}

	assertResultsSortedByIsPresent() {
		this.identifiers.documentResultsSort().should('have.text', 'Recently updated');
	}

	clickOnApplyFilters() {}

	openProjectOverview(projectName) {
		cy.visit('/project-search');
		this.clickProjectLink(projectName);
	}

	clickRegisterToHaveYourSayLink() {
		this.clickLinkByHref('/register-have-your-say');
	}

	clickContentsNavigationLink(pageName) {
		this.clickContentsLink(pageName);
	}

	clickHavingYourSayGuideLink() {
		this.clickLinkByHref('/having-your-say-guide');
	}
}
export default PO_OverviewPage;
