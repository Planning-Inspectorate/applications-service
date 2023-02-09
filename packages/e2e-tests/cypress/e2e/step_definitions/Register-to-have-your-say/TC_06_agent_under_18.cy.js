import { Given, Then, And } from 'cypress-cucumber-preprocessor/steps';
import PO_HaveYourSay from '../../../pageObject/Register-to-have-your-say/PO_HaveYourSay';
import PO_CheckBox from '../../../pageObject/Register-to-have-your-say/PO_CheckBox';
const haveYourSay = new PO_HaveYourSay();
const checkBox = new PO_CheckBox();

And('I selects checkbox on behalf of another person, family - under 18', () => {
	checkBox.onBehalfCheckBox(); //Who are you registering for? On behalf of another person, a family group
	haveYourSay.continueButton();
});

And('I complete the registration process on behalf of another person, family - under 18', () => {
	haveYourSay.fullNameField().type('John Doe'); // Full Name
	haveYourSay.continueButton();
	haveYourSay.organisationNameField().type('Charity');
	haveYourSay.continueButton();
	haveYourSay.emailField().type('john.doe@genesis.com');
	haveYourSay.continueButton();
	haveYourSay.phoneField().type('01265789456');
	haveYourSay.continueButton();
	cy.addressFields();
	haveYourSay.continueButton();
	checkBox.aFamilyGroupCheckBox();
	haveYourSay.continueButton();
	haveYourSay.familyGroupField().type('Omega');
	haveYourSay.continueButton();
	checkBox.yesCheckBox(); // Are they 18 or over? Yes
	haveYourSay.continueButton();
	cy.addressFields(); // Address fields
	haveYourSay.continueButton();
	haveYourSay.emailField().type('john.doe@genesis.com');
	haveYourSay.continueButton();
	haveYourSay.phoneField().type('01265789456');
	haveYourSay.continueButton();
	haveYourSay.commentField().type('Lorem ipsum dolor sit amet, consectetur adipiscing elit'); // Comment
	haveYourSay.continueButton();
	haveYourSay.acceptContinueBtn();
	haveYourSay.acceptRegister();
});

Then(
	'I sucessfully complete the registration on behalf of another person, family - under 18 {string}',
	(successMessage) => {
		haveYourSay.regComplete().should('be.visible', successMessage);
		cy.clearCookies();
	}
);
