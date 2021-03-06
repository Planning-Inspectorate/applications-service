module.exports = (radioChoice) => {
	switch (radioChoice) {
		case 'Myself':
			cy.get('[data-cy="answer-mySay"]').click();
			break;
		case 'Organisation':
			cy.get('[data-cy="answer-organisation"]').click();
			break;
		case 'Agent':
			cy.get('[data-cy="answer-behalf"]').click();
			break;
		default:
			throw console.error('uanble to find specified radio option: ' + radioChoice);
	}

	cy.wait(Cypress.env('demoDelay'));
};
