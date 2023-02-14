import { Given, Then, And } from 'cypress-cucumber-preprocessor/steps';
import PO_HaveYourSay from '../../../pageObject/Register-to-have-your-say/PO_HaveYourSay';
import PO_CheckBox from '../../../pageObject/Register-to-have-your-say/PO_CheckBox';
const haveYourSay = new PO_HaveYourSay();
const checkBox = new PO_CheckBox();

And('I selects checkbox for myself - under 18', () => {
	checkBox.mySelfCheckBox(); //Who are you registering for? Myself
	haveYourSay.continueButton();
});

And('I complete the registration process as myself - under 18', () => {
	haveYourSay.fullNameField().type('John Doe');
	haveYourSay.continueButton();
	cy.clickYesOrNoButton('no'); //Are you 18 or over? No
	haveYourSay.continueButton();
	haveYourSay.emailField().type('john-doe@aol.co.uk');
	haveYourSay.continueButton();
	cy.addressFields(); // Address fields
	haveYourSay.continueButton();
	haveYourSay.phoneField().type('01265789456');
	haveYourSay.continueButton();
	haveYourSay.commentField().type('Lorem ipsum dolor sit amet, consectetur adipiscing elit');
	haveYourSay.continueButton();
	haveYourSay.acceptContinueBtn();
	haveYourSay.acceptRegister();
});

Then(
	'I sucessfully complete the registration process for myself - under 18 {string}',
	(successMessage) => {
		haveYourSay.regComplete().should('be.visible', successMessage);
		cy.clearCookies();
	}
);
