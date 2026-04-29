module.exports = () => {
	cy.get('[data-cy="button-save-and-return"]').first().click();
	cy.waitForDemoDelay();
};
