///<reference types ="cypress" />
import { Given, Then, And } from 'cypress-cucumber-preprocessor/steps';
import PO_ExaminationTimetable from '../../../pageObject/Examination-TimeTable/PO_ExaminationTimetable';
const examTimetable = new PO_ExaminationTimetable();

Then('I complete the submission process as a agent - drag and drop', () => {
	examTimetable.startNowButton();
	examTimetable.partyNumberYesCheckBox();
	examTimetable.continueButton();
	examTimetable.partyNumberField().type('45677');
	examTimetable.continueButton();
	examTimetable.agentCheckbox(); // Submission as Agent
	examTimetable.continueButton();
	examTimetable.agentField().type('Charity');
	examTimetable.continueButton();
	examTimetable.emailField().type('joeExample@gmail.com');
	examTimetable.continueButton();
	examTimetable.deadLineCheckBox_1();
	examTimetable.continueButton();
	examTimetable.uploadFileCheckBox();
	examTimetable.continueButton();
	examTimetable
		.fileUploadButton()
		.selectFile('cypress/fixtures/Soap Opera Testing.pdf', { action: 'drag-drop' }); // Drag and drop
	examTimetable.fileUploadButton_2();
	examTimetable.fileContentCheckBoxYes();
	examTimetable.continueButton();
	examTimetable.continueButton();
	examTimetable.deadLineCheckBoxNo();
	examTimetable.deadLineContinueBtn();
	examTimetable.continueButton_2();
	examTimetable.processSubmissionButton();
});

Then('I sucessfully complete the submission as a agent {string}', (successMessage) => {
	examTimetable.submissionCompleteTitle().should('be.visible', successMessage);
});
