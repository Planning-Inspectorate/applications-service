import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import PO_Homepage from '../../common/PageObjects/PO_Homepage';
import { BasePage } from '../../projects/shared/PageObjects/BasePage';

const basePage = new BasePage();
const homepage = new PO_Homepage();

Given('I open the local homepage', () => {
	homepage.openHomepage();
});

When('I switch the homepage language to {string}', (language) => {
	basePage.languageVisible(language);
	basePage.selectLanguage(language);
	homepage.assertLanguageInUrl(language);
});

Then('the homepage is displayed in Welsh', () => {
	basePage.locateH1ByText('Croeso');
});

Then('the homepage is displayed in English', () => {
	basePage.locateH1ByText('Welcome');
});
