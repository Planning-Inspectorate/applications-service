///<reference types ="cypress" />
import { Given, Then, And } from 'cypress-cucumber-preprocessor/steps';
import PO_ExaminationTimetable from '../../../pageObject/Examination-TimeTable/PO_ExaminationTimetable';
const examTimetable = new PO_ExaminationTimetable();

Then('I complete the submission process as an organisation', () => {
	examTimetable.startNowButton();
	examTimetable.partyNumberYesCheckBox();
	cy.continueButton();
	examTimetable.partyNumberField().type('45677');
	cy.continueButton();
	examTimetable.organizationCheckBox(); // Submission as an organisation
	cy.continueButton();
	examTimetable.organizationField().type('Charity');
	cy.continueButton();
	examTimetable.emailField().type('joeExample@gmail.com');
	cy.continueButton();
	examTimetable.deadLineCheckBox_1();
	cy.continueButton();
	examTimetable.uploadFileCheckBox();
	cy.continueButton();
	examTimetable.fileUploadButton().attachFile('Soap Opera Testing.pdf'); // Upload file
	examTimetable.fileUploadButton_2();
	examTimetable.fileContentCheckBoxYes();
	cy.continueButton();
	cy.continueButton();
	examTimetable.deadLineCheckBoxNo();
	examTimetable.deadLineContinueBtn();
	examTimetable.continueButton_2();
	examTimetable.processSubmissionButton();
});

Then('I sucessfully complete the submission as an organisation {string}', (successMessage) => {
	examTimetable.submissionCompleteTitle().should('be.visible', successMessage);
});
