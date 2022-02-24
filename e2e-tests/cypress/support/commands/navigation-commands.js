// These commands are intended for simple page navigation by url


// Common
Cypress.Commands.add('clickSaveAndContinue', require('../common-methods/clickSaveAndContinue'));

Cypress.Commands.add('confirmTextOnPage', require('../common-methods/confirmTextOnPage'));

Cypress.Commands.add('assertErrorMessage', require('../common-methods/assertErrorMessage'));

Cypress.Commands.add('clickOnHref', require('../common-methods/clickOnHref'));

Cypress.Commands.add('clickOnBackLink', require('../common-methods/clickOnBackLink'));

Cypress.Commands.add('clickLinkTonavigateToPage', require('../common-methods/clickLinkTonavigateToPage'));

Cypress.Commands.add('assertUserOnThePage', require('../common-methods/assertUserOnThePage'));

Cypress.Commands.add('clickProjectLink', require('../common-methods/clickProjectLink'));

Cypress.Commands.add('clickContentsLink', require('../common-methods/clickContentsLink'));

Cypress.Commands.add('selectRadioYesOrNo', require('../common-methods/selectRadioYesOrNo'));

Cypress.Commands.add('assertLinksPresentOnPage', require('../common-methods/assertLinksPresentOnPage'));

// Register Type of Party page select radio choice
Cypress.Commands.add('selectRadioOption', require('../register-type-of-party-page/selectRadioOption'));