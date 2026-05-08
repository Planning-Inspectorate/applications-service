import PageObject from '../../../../PageObject';

class PO_AddAnotherComment extends PageObject {
	identifiers = {
		changeCommentLink: () => cy.get('[data-cy="comments-change-0"]'),
		removeCommentLink: () => cy.get('[data-cy="comments-remove-0"]')
	};

	get functions() {
		return new Proxy(
			{},
			{
				get: (_, prop) => this[prop].bind(this)
			}
		);
	}

	clickOnLink(linkType) {
		switch (linkType) {
			case 'change':
				this.identifiers.changeCommentLink().click();
				break;
			case 'remove':
				this.identifiers.removeCommentLink().click();
				break;
			default:
				throw console.error('unable to find specified radio option: ' + linkType);
		}
	}
}
export default PO_AddAnotherComment;
