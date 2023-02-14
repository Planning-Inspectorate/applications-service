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

Then('User reports an abuse', () => {
	cy.contains('Tell us what you thought about this service').click();
	cy.get('.office-form-notice-report').click();
	cy.get('#Phishing').click();
	cy.get('.office-form-reportabuse-input').type(
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
	);
	cy.get('.button-content').click();
	//cy.get('.thank-you-page-container').should('be.visible', 'Your report was submitted.');
	cy.get('.thank-you-page-container')
		.invoke('text')
		.then((text) => {
			expect(text).to.equal('Your report was submitted.');
		});
});
