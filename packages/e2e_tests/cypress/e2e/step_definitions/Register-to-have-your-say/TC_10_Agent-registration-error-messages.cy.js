import { When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import PO_HaveYourSay from '../../../pageObject/Register-to-have-your-say/PO_HaveYourSay';
import PO_CheckBox from '../../../pageObject/Register-to-have-your-say/PO_CheckBox';
const haveYourSay = new PO_HaveYourSay();
const checkBox = new PO_CheckBox();

When(
	'I and click the submit button on all the pages without completing the mandatory options',
	() => {
		cy.continueButton();
	}
);

Then('And a error message is displayed - Select who you are registering for', () => {
	cy.errorMessage('partyError').should('contain', 'Select who you are registering for');
	checkBox.mySelfCheckBox();
	haveYourSay.continueButton();
});

Then('And a error message is displayed - Enter your full name', () => {
	haveYourSay.continueButton();
	cy.errorMessage('fullName').should('contain', 'Enter your full name');
	haveYourSay.fullNameField().type('John Doe');
	cy.continueButton();
});

Then('And a error message is	displayed - Select yes if you are 18 or over', () => {
	cy.continueButton();
	cy.errorMessage('over-18').should('contain', 'Select yes if you are 18 or over');
	cy.clickYesOrNoButton('yes'); //Are you 18 or over? Yes
	cy.continueButton();
});

Then('And a error message is  displayed - Enter your email address', () => {
	cy.continueButton();
	cy.errorMessage('email-error').should('contain', 'Enter your email address');
	haveYourSay.emailField().type('john-doe@aol.co.uk');
	cy.continueButton();
});

Then('And error messages are displayed in the address fields', () => {
	cy.continueButton();
	cy.errorMessage('address-error_1').should('contain', 'Enter address line 1');
	cy.errorMessage('address-error_2').should('contain', 'Enter a postcode');
	cy.errorMessage('address-error_3').should('contain', 'Enter a country');
	cy.addressFields();
	cy.continueButton();
});

Then('And a error message is displayed - Enter your telephone number', () => {
	cy.continueButton();
	cy.errorMessage('telephone-error').should('contain', 'Enter your telephone number');
	haveYourSay.phoneField().type('01265789456');
	haveYourSay.continueButton();
});

Then(
	'And a error message is displayed - Enter what you want to tell us about this proposed project',
	() => {
		cy.continueButton();
		cy.errorMessage('comment-error').should(
			'contain',
			'Enter what you want to tell us about this proposed project'
		);
		haveYourSay.commentField().type('Lorem ipsum dolor sit amet, consectetur adipiscing elit');
		haveYourSay.continueButton();
	}
);
