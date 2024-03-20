describe('use can view and interact with the project informaiton page', () => {
	it('user can visit the project information page', () => {
		cy.clearCookies();
		cy.visit('/projects/BC0110002');

		cy.get('.govuk-caption-l').contains('Office Use Testing Application 2');
	});
});
