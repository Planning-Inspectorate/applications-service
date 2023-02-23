import { When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import PO_HaveYourSay from '../../../pageObject/Register-to-have-your-say/PO_HaveYourSay';
import PO_CheckBox from '../../../pageObject/Register-to-have-your-say/PO_CheckBox';
const haveYourSay = new PO_HaveYourSay();
const checkBox = new PO_CheckBox();

When('User starts the registartion process as myself', () => {
	haveYourSay.continueButton().click();
});

Then('An error message is displayed on the registering for page {string}', (errorText) => {
	cy.errorMessages(errorText);
	checkBox.mySelfCheckBox();
	haveYourSay.continueButton().click();
});

Then('An error message is displayed on the full name page {string}', (errorText) => {
	haveYourSay.continueButton().click();
	cy.errorMessages(errorText);
	haveYourSay.fullNameField().type('John Doe');
	haveYourSay.continueButton().click();
});

Then('An error message is	displayed on the 18 or over page {string}', (errorText) => {
	haveYourSay.continueButton().click();
	cy.errorMessages(errorText);
	checkBox.yesCheckBox(); //Are you 18 or over? Yes
	cy.continueButton();
});

Then('An error message is displayed on email address page {string}', (errorText) => {
	cy.continueButton();
	cy.errorMessages(errorText);
	haveYourSay.emailField().type('john-doe@aol.co.uk');
	cy.continueButton();
});

Then('An error messages are displayed on address page {string} {string} {string}', (errorText) => {
	cy.continueButton();
	cy.errorMessages(errorText);
	cy.errorMessages(errorText);
	cy.errorMessages(errorText);
	cy.addressFields();
	cy.continueButton();
});

Then('An error message is displayed on phone page {string}', (errorText) => {
	cy.continueButton();
	cy.errorMessages(errorText);
	haveYourSay.phoneField().type('01265789456');
	haveYourSay.continueButton().click();
});

Then('An error message is displayed {string}', (errorText) => {
	cy.continueButton();
	cy.errorMessages(errorText);
	haveYourSay.commentField().type('Lorem ipsum dolor sit amet, consectetur adipiscing elit');
	haveYourSay.continueButton();
});
