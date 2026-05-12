import PageObject from '../../../../PageObject';

class PO_RegComplete extends PageObject {
	identifiers = {
		...this.identifiers,
		acceptAndRegisterButton: () => cy.get('[data-cy="button-accept-and-register"]'),
		projectLink: () => cy.get('#project-link')
	};

	get functions() {
		return new Proxy(
			{},
			{
				get: (_, prop) => this[prop].bind(this)
			}
		);
	}

	clickDeclarationLink(linkType) {
		switch (linkType) {
			case 'myself':
				this.clickLinkByHref('/register/myself/declaration');
				break;
			case 'organisation':
				this.clickLinkByHref('/register/organisation/declaration');
				break;
			default:
				throw new Error(`No declaration link found for ${linkType}`);
		}
	}

	clickAcceptAndRegister() {
		this.identifiers.acceptAndRegisterButton().click();
	}

	clickExaminationGuideLink() {
		this.clickLinkByHref('/having-your-say-guide/have-your-say-examination');
	}

	clickProjectLink() {
		this.identifiers.projectLink().click();
	}
}
export default PO_RegComplete;
