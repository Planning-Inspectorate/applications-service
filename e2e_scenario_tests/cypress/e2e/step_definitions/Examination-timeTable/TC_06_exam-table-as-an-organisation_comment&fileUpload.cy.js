///<reference types ="cypress" />
import { Given, Then, And } from 'cypress-cucumber-preprocessor/steps';
import PO_HaveYourSay from '../../../pageObject/Register-to-have-your-say/PO_HaveYourSay';
import PO_ExaminationTimetable from '../../../pageObject/Examination-TimeTable/PO_ExaminationTimetable';
const haveYourSay = new PO_HaveYourSay();
const examTimetable = new PO_ExaminationTimetable();

Then(
	'I complete the submission process as an organisation with both comments and file upload',
	() => {
		examTimetable.startNowButton();
		examTimetable.partyNumberYesCheckBox();
		examTimetable.continueButton();
		examTimetable.partyNumberField().type('45677');
		examTimetable.continueButton();
		examTimetable.organizationCheckBox(); // Submission as an organisation
		examTimetable.continueButton();
		examTimetable.organizationField().type('Charity');
		examTimetable.continueButton();
		examTimetable.emailField().type('joeExample@gmail.com');
		examTimetable.continueButton();
		examTimetable.deadLineCheckBox_1();
		examTimetable.continueButton();
		examTimetable.bothCheckBox(); // Both comments and file upload checkboxes selected
		examTimetable.continueButton();
		examTimetable
			.yourCommentField()
			.type('Lorem ipsum dolor sit amet, consectetur adipiscing elit'); // Comment
		examTimetable.continueButton();
		examTimetable.fileUploadButton().attachFile('Soap Opera Testing.pdf'); // Upload file
		examTimetable.fileUploadButton_2();
		examTimetable.persoanlInfoCheckBoxYes();
		examTimetable.continueButton();
		examTimetable.persoanlInfoCheckBox_1(); //Which files and comments contain personal information?
		examTimetable.persoanlInfoCheckBox_2(); // Which files and comments contain personal information?
		examTimetable.continueButton();
		examTimetable.continueButton();
		examTimetable.deadLineCheckBoxNo(); //You added one deadline item
		examTimetable.deadLineContinueBtn();
		examTimetable.continueButton_2();
		examTimetable.processSubmissionButton();
	}
);

Then(
	'I sucessfully complete the submission as an organisation with both comments and file upload {string}',
	(successMessage) => {
		examTimetable.submissionCompleteTitle().should('be.visible', successMessage);
	}
);
