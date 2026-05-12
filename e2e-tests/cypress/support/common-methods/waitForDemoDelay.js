module.exports = () => {
	const demoDelay = Number(Cypress.env('demoDelay')) || 0;

	if (demoDelay > 0) {
		cy.wait(demoDelay);
	}
};
