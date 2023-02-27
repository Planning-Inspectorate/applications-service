///<reference types ="cypress" />
import { Given, Then, And } from 'cypress-cucumber-preprocessor/steps';
import PO_HaveYourSay from '../../../pageObject/Register-to-have-your-say/PO_HaveYourSay';
import PO_ExaminationTimetable from '../../../pageObject/Examination-TimeTable/PO_ExaminationTimetable';
const haveYourSay = new PO_HaveYourSay();
const examTimetable = new PO_ExaminationTimetable();

Then('I complete the submission process as myself with both comments and file upload', () => {
	examTimetable.startNowButton();
	examTimetable.partyNumberYesCheckBox();
	cy.continueButton();
	examTimetable.partyNumberField().type('45677');
	cy.continueButton();
	examTimetable.myselfCheckBox(); // Submission as myself
	cy.continueButton();
	examTimetable.fullNameField().type('Joe');
	cy.continueButton();
	examTimetable.emailField().type('Joe@example.com');
	cy.continueButton();
	examTimetable.deadLineCheckBox_1();
	cy.continueButton();
	examTimetable.bothCheckBox(); //Both comments and file upload checkboxes selected
	cy.continueButton();
	examTimetable.yourCommentField().type('Lorem ipsum dolor sit amet, consectetur adipiscing elit'); // Comment
	cy.continueButton();
	examTimetable.fileUploadButton().attachFile('SQL.pdf'); // Upload file
	examTimetable.fileUploadButton_2();
	cy.get('#continue-form-button').click();
	examTimetable.persoanlInfoCheckBoxNo();
	cy.continueButton();
	cy.continueButton();
	examTimetable.deadLineCheckBoxNo();
	examTimetable.deadLineContinueBtn();
	examTimetable.continueButton_2();
});

Then(
	'I sucessfully complete the submission as myself with both comments and file upload {string}',
	(successMessage) => {
		examTimetable.submissionCompleteTitle().should('be.visible', successMessage);
	}
);
