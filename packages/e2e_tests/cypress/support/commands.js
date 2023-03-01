import { clickFooterLink } from './customActions/pageActions';
import { pageVerification } from './customActions/pageActions';
import { errorMessages } from './customActions/pageActions';
import { clickGovLinks } from './customActions/pageActions';
Cypress.Commands.add('clickFooterLink', clickFooterLink);
Cypress.Commands.add('pageVerification', pageVerification);
Cypress.Commands.add('errorMessages', errorMessages);
Cypress.Commands.add('clickGovLinks', clickGovLinks);

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

Cypress.Commands.add('documentResults', () => {
	cy.get('.section-results__result-link');
});

import 'cypress-file-upload';
