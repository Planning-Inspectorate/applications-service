// These commands are intended for simple page navigation by url


// Common
Cypress.Commands.add('clickSaveAndContinue', require('../register-navigation/clickSaveAndContinue'));

// Register
Cypress.Commands.add(
    'confirmTextOnPage',
    require('../register-navigation-confirmation/register/confirmTextOnPage'),
);
