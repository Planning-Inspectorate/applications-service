///<reference types ="cypress" />
import { Given, Then, And } from 'cypress-cucumber-preprocessor/steps';
import PO_ExaminationTimetable from '../../../pageObject/Examination-TimeTable/PO_ExaminationTimetable';
const examTimetable = new PO_ExaminationTimetable();

Then('I complete the submission process as myself - drag and drop', () => {
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
	examTimetable
		.fileUploadButton()
		.selectFile('cypress/fixtures/Soap Opera Testing.pdf', { action: 'drag-drop' }); // Drag and drop
	examTimetable.fileUploadButton_2();
	cy.get('#continue-form-button').click();
	examTimetable.fileContentCheckBoxYes();
	cy.continueButton();
	cy.continueButton();
	examTimetable.deadLineCheckBoxNo();
	examTimetable.deadLineContinueBtn();
	examTimetable.continueButton_2();
	examTimetable.processSubmissionButton();
});

Then('I sucessfully complete the submission as myself {string}', (successMessage) => {
	examTimetable.submissionCompleteTitle().should('be.visible', successMessage);
});
