import { Given, Then, And } from 'cypress-cucumber-preprocessor/steps';
import PO_HaveYourSay from '../../../pageObject/Register-to-have-your-say/PO_HaveYourSay';
import PO_CheckBox from '../../../pageObject/Register-to-have-your-say/PO_CheckBox';
const haveYourSay = new PO_HaveYourSay();
const checkBox = new PO_CheckBox();

And('I selects checkbox for organisation I work or volunteer - over 18', () => {
	checkBox.organizationCheckBox(); //Who are you registering for? An organisation I work or volunteer for
	haveYourSay.continueButton();
});
And('I complete the registration process for an organisation I work or volunteer - over 18', () => {
	haveYourSay.fullNameField().type('John Doe');
	haveYourSay.continueButton();
	checkBox.yesCheckBox(); //Are you 18 or over? Yes
	haveYourSay.continueButton();
	haveYourSay.organisationNameField().type('Charity');
	haveYourSay.continueButton();
	haveYourSay.jobRoleField().type('Manager');
	haveYourSay.continueButton();
	haveYourSay.emailField().type('john.doe@gmail.com');
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
	'I sucessfully complete the registration for an organisation I work or volunteer - over 18 {string}',
	(successMessage) => {
		haveYourSay.regComplete().should('be.visible', successMessage);
		cy.clearCookies();
	}
);
