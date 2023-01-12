class PO_AddAnotherComment {
	clickOnLink(linkType) {
		switch (linkType) {
			case 'change':
				cy.get('[data-cy="comments-change-0"]').click();
				break;
			case 'remove':
				cy.get('[data-cy="comments-remove-0"]').click();
				break;
			default:
				throw console.error('unable to find specified radio option: ' + linkType);
		}
	}
}
export default PO_AddAnotherComment;
