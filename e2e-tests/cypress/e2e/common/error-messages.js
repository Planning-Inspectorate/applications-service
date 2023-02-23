import { Then } from 'cypress-cucumber-preprocessor/steps';

Then('the following error message should be presented: {string}', (msg) => {
	cy.contains(msg);
});

Then('the following error messages should be presented', function (table) {
	cy.assertErrorMessage(table);
});
