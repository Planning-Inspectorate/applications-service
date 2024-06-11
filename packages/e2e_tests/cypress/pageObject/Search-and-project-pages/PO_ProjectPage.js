export class PO_ProjectPage {
	findAndClickButton(string) {
		cy.get('.govuk-button').contains(string).click();
	}

	findAndClickSidebarLinkLeft(string) {
		cy.get('.govuk-grid-column-one-third').contains(string).click();
	}
}
