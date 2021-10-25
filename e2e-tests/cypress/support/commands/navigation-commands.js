// These commands are intended for simple page navigation by url


// Common
Cypress.Commands.add('clickSaveAndContinue', require('../common-methods/clickSaveAndContinue'));

Cypress.Commands.add('confirmTextOnPage', require('../common-methods/confirmTextOnPage'));

Cypress.Commands.add('assertErrorMessage', require('../common-methods/assertErrorMessage'));

// Register Type of Party page select radio choice
Cypress.Commands.add('selectRadioOption', require('../register-type-of-party-page/selectRadioOption'));