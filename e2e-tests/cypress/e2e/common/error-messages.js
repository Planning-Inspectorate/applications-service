import { Then } from 'cypress-cucumber-preprocessor/steps';
import PageObject from '../PageObject';

const page = new PageObject();

Then('the following error message should be presented: {string}', (msg) => {
	page.assertTextPresent(msg);
});

Then('the following error messages should be presented', function (table) {
	page.assertErrorMessages(table);
});
