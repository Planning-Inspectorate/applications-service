import { Given, When } from 'cypress-cucumber-preprocessor/steps';

Given('I am registering as an {string}', (radioChoice) => {
	cy.visit('/project-search', { failOnStatusCode: false });
	cy.clickProjectLink('North Lincolnshire Green Energy Park');
	cy.captureScreenForSiteMap();
	cy.clickOnHref('register-have-your-say');
	cy.captureScreenForSiteMap();
	cy.clickOnHref('who-registering-for');
	cy.captureScreenForSiteMap();
	cy.selectRadioOption(radioChoice);
	cy.clickSaveAndContinue();
});

When('I click on the continue button', () => {
	cy.captureScreenForSiteMap();
	cy.clickSaveAndContinue();
});
