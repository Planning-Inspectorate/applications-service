import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { BasePage } from '../../projects/shared/PageObjects/BasePage';

const basePage = new BasePage();

Given('I open the local homepage', () => {
	cy.visit('/');
});

When('I switch the homepage language to {string}', (language) => {
	basePage.languageVisible(language);
	basePage.selectLanguage(language);
	cy.url().should('include', `lang=${language}`);
});

Then('the homepage is displayed in Welsh', () => {
	basePage.locateH1ByText('Croeso');
});

Then('the homepage is displayed in English', () => {
	basePage.locateH1ByText('Welcome');
});
