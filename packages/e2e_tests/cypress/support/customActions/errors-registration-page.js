module.exports = {
	errorMessage: (error) => {
		switch (error) {
			case 'partyError':
				cy.get('#type-of-party-error');
				break;
			case 'fullName':
				cy.get('#full-name-error');
				break;
			case 'over-18':
				cy.get("a[href='#over-18']");
				break;
			case 'email-error':
				cy.get('#email-error');
				break;
			case 'address-error_1':
				cy.get("a[href='#line1']");
				break;
			case 'address-error_2':
				cy.get("a[href='#postcode']");
				break;
			case 'address-error_3':
				cy.get("a[href='#country']");
				break;
			case 'telephone-error':
				cy.get('#telephone-error');
				break;
			case 'comment-error':
				cy.get('#comment-error');
		}
	}
};
