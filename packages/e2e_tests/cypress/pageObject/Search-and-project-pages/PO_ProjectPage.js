export class PO_ProjectPage {
	findAndClickButton(string) {
		cy.get('.govuk-button').contains(string).click();
	}

	findAndClickSidebarLinkLeft(string) {
		cy.get('.ui-vertical-tabs__list-item').contains(string).click();
	}
}
