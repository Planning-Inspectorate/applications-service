export class PO_ProjectSearch {
	findAndClickLink(string) {
		cy.get('.govuk-link').contains(string).click();
	}
}
