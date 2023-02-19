module.exports = {
	clickYesOrNoButton: (yesOrNo) => {
		switch (yesOrNo) {
			case 'yes':
				cy.get('[data-cy="answer-yes"]').click();
				break;
			case 'no':
				cy.get('[data-cy="answer-no"]').click();
				break;
			default:
				throw new Error(`Invalid argument: ${yesOrNo}. Expected "yes" or "no".`);
		}
	}
};
