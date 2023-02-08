import { Then, And } from 'cypress-cucumber-preprocessor/steps';
import PO_HaveYourSay from '../../../pageObject/Register-to-have-your-say/PO_HaveYourSay';
import PO_CheckBox from '../../../pageObject/Register-to-have-your-say/PO_CheckBox';
const haveYourSay = new PO_HaveYourSay();
const checkBox = new PO_CheckBox();

And('The user has completed the have your say journey', () => {
	checkBox.mySelfCheckBox(); //Who are you registering for? Myself
	haveYourSay.continueButton();
	haveYourSay.fullNameField().type('John Doe');
	haveYourSay.continueButton();
	checkBox.yesCheckBox(); //Are you 18 or over? Yes
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

Then('User completes a survey form', () => {
	cy.contains('Tell us what you thought about this service').click();
	cy.get(':nth-child(1) > .radio > .office-form-question-choice-row > input').click();
	cy.get('.office-form-question-textbox').type(
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
	);
	cy.get("button[title='Submit'] div[class='button-content']").click();
	cy.get('.thank-you-page-container > .text-format-content').should(
		'be.visible',
		'Your response was submitted.'
	);
});
