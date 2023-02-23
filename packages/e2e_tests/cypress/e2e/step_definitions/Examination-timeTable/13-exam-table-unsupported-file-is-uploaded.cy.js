import { Then, And } from 'cypress-cucumber-preprocessor/steps';
import PO_ExaminationTimetable from '../../../pageObject/Examination-TimeTable/PO_ExaminationTimetable';
const examTimetable = new PO_ExaminationTimetable();

Then('I upload a unsupported file as myself', () => {
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
	examTimetable.uploadFileCheckBox();
	cy.continueButton();
	examTimetable.fileUploadButton().attachFile('Testing.txt'); // Upload file
	examTimetable.fileUploadButton_2();
});

Then('An error message is displayed', () => {
	cy.get('#error-summary-title').contains('There is a problem');
});
