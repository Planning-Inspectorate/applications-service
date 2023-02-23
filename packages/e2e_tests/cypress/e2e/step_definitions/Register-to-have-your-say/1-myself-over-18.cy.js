///<reference types ="cypress" />
import { Then, And } from 'cypress-cucumber-preprocessor/steps';
import PO_HaveYourSay from '../../../pageObject/Register-to-have-your-say/PO_HaveYourSay';
import PO_CheckBox from '../../../pageObject/Register-to-have-your-say/PO_CheckBox';
const haveYourSay = new PO_HaveYourSay();
const checkBox = new PO_CheckBox();

And('I selects checkbox for myself - over 18', () => {
	checkBox.mySelfCheckBox(); //Who are you registering for? Myself
	haveYourSay.continueButton().click();
});

And('I complete the registration process as myself - over 18', () => {
	haveYourSay.fullNameField().type('John Doe');
	haveYourSay.continueButton().click();
	checkBox.yesCheckBox(); //Are you 18 or over? Yes
	haveYourSay.continueButton().click();
	haveYourSay.emailField().type('john-doe@aol.co.uk');
	haveYourSay.continueButton().click();
	cy.addressFields(); // Address fields
	haveYourSay.continueButton().click();
	haveYourSay.phoneField().type('01265789456');
	haveYourSay.continueButton().click();
	haveYourSay.commentField().type('Lorem ipsum dolor sit amet, consectetur adipiscing elit');
	haveYourSay.continueButton().click();
	haveYourSay.acceptContinueBtn();
	haveYourSay.acceptRegister();
});

Then(
	'I sucessfully complete the registration process for myself - over 18 {string}',
	(successMessage) => {
		haveYourSay.regComplete().should('be.visible', successMessage);
		cy.clearCookies();
	}
);
