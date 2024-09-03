describe('use can view and interact with the project informaiton page', () => {
	it('user can visit the project information page', () => {
		cy.clearCookies();
		cy.visit('/projects/BC0910150');

		cy.get('.govuk-caption-l').contains('Front Office Auto Test');
	});
});
