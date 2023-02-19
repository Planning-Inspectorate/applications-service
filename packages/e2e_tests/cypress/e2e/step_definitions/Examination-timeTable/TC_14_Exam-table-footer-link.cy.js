import { Then, And } from 'cypress-cucumber-preprocessor/steps';

//Terms and Conditions page
And('I click on Terms and conditions footer link', () => {
	cy.clickFooterLink('Terms and conditions');
});

Then('I am on the Terms and conditions page', () => {
	cy.pageVerification('Terms and conditions');
	cy.go('back');
});

//Accessibility page
And('I click on accessibility footer link', () => {
	cy.clickFooterLink('Accessibility');
});
Then('I am on the accessibility page', () => {
	cy.pageVerification('Accessibility');
	cy.go('back');
});

//Privacy Policy page
And('I click on privacy Notice footer link', () => {
	cy.clickFooterLink('Privacy Notice');
});
Then('I am on the privacy Notice page', () => {
	cy.pageVerification('Privacy Notice');
	cy.go('back');
});

// Cookie page
And('I click on cookies footer link', () => {
	cy.clickFooterLink('Cookies');
});
Then('I am on the cookies settings page', () => {
	cy.pageVerification('Cookies');
	cy.get('[data-cy="usage-cookies-yes"]').click();
	cy.get('[data-cy="button-save-changes"]').click();
	cy.get('[data-cy="cookies-updated-heading-text"]').should(
		'contain',
		'Your cookie settings were saved'
	);
});
