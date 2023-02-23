import { Then, And } from 'cypress-cucumber-preprocessor/steps';

And('I click on {string} footer link', (linkText) => {
	cy.clickFooterLink(linkText);
});

Then('I am on the {string} page', (pageName) => {
	cy.pageVerification(pageName);
	cy.go('back');
});
