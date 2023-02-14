import { clickYesOrNoButton } from '../support/customCommands/yesNoCheckBox';
Cypress.Commands.add('clickYesOrNoButton', clickYesOrNoButton);

Cypress.Commands.add('addressFields', () => {
	cy.get('#line1').type('45');
	cy.get('#line2').type('Moss Grange');
	cy.get('#line3').type('Bristol');
	cy.get('#postcode').type('BS1 4AJ');
	cy.get('#country').type('UK');
});

Cypress.Commands.add('continueButton', () => {
	cy.get('[data-cy="button-submit-and-continue"]').click();
});

import 'cypress-file-upload';
