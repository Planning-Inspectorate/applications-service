// These commands are intended for simple page navigation by url


// Common
Cypress.Commands.add('clickSaveAndContinue', require('../common-methods/clickSaveAndContinue'));

Cypress.Commands.add('confirmTextOnPage', require('../common-methods/confirmTextOnPage'));

Cypress.Commands.add('assertErrorMessage', require('../common-methods/assertErrorMessage'));

Cypress.Commands.add('clickOnHref', require('../common-methods/clickOnHref'));

Cypress.Commands.add('clickOnBackLink', require('../common-methods/clickOnBackLink'));

// Register Type of Party page select radio choice
Cypress.Commands.add('selectRadioOption', require('../register-type-of-party-page/selectRadioOption'));