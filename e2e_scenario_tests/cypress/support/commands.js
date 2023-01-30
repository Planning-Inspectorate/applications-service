Cypress.Commands.add('addressFields', () => {
	cy.get('#line1').type('45');
	cy.get('#line2').type('Moss Grange');
	cy.get('#line3').type('Bristol');
	cy.get('#postcode').type('BS1 4AJ');
	cy.get('#country').type('UK');
});

import 'cypress-file-upload';
