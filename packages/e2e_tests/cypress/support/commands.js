import { clickYesOrNoButton } from './customActions/18-or-over-registration';
import { clickFooterLink } from './customActions/footer-link';
import { pageVerification } from './customActions/page-link-navigation';
import { errorMessage } from './customActions/errors-registration-page';
Cypress.Commands.add('clickYesOrNoButton', clickYesOrNoButton);
Cypress.Commands.add('clickFooterLink', clickFooterLink);
Cypress.Commands.add('pageVerification', pageVerification);
Cypress.Commands.add('errorMessage', errorMessage);

Cypress.Commands.add('addressFields', () => {
	cy.get('#line1').type('45');
	cy.get('#line2').type('Moss Grange');
	cy.get('#line3').type('Bristol');
	cy.get('#postcode').type('BS1 4AJ');
	cy.get('#country').type('UK');
});

Cypress.Commands.add('continueButton', () => {
	cy.get('form > button.govuk-button').click();
});

import 'cypress-file-upload';
