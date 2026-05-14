import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import PO_FullName from '../full-name/PageObjects/PO_FullName';
import PO_WhoYouRegisterFor from '../../who-are-you-registering-for/PageObjects/PO_WhoYouRegisterFor';
const fullNamePage = new PO_FullName();
const whoYouRegisterForPage = new PO_WhoYouRegisterFor();

Given('I navigate to Are you 18 or over page', () => {
	whoYouRegisterForPage.navigatetoTypeOfPartyPage();
	whoYouRegisterForPage.selectPartyAndContinue('Myself');
	fullNamePage.enterTextIntoFullNameField('TestFirstName TestMiddleName TestLastName');
	fullNamePage.clickSaveAndContinue();
});

And('User clicks on continue button', () => {
	fullNamePage.clickSaveAndContinue();
});

Then('below error message should be presented on are you 18 or over page', function (table) {
	fullNamePage.assertErrorMessages(table);
});

When('user selects {string} radio option on are you 18 or over page', (radioChoice) => {
	fullNamePage.selectRadioYesOrNo(radioChoice);
});

Then('I am on the {string} page', (pageName) => {
	fullNamePage.assertOnPage(pageName);
});
