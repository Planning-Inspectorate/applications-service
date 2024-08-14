import { PO_ExaminationTimetable } from '../pageObject/Examination-TimeTable/PO_ExaminationTimetable';

const examinationTimetable = new PO_ExaminationTimetable();

describe('Agent has their say against the examination timetable', () => {
	it('Navigates to the examination timetable page for a project and start the journey', () => {
		cy.clearCookies();
		cy.visit('/projects/BC0910150/examination-timetable');
		examinationTimetable.clickLink();
		examinationTimetable.clickStartNowButton();
	});

	it('Selects no for interested party number and to member of project', () => {
		examinationTimetable.findAndSelectRadioOption('no');
		examinationTimetable.clickContinueButton();
		examinationTimetable.findAndSelectRadioOption('no');
		examinationTimetable.clickContinueButton();
	});

	it('Selects Agent, enters organisation name and email addres and continues', () => {
		examinationTimetable.findAndSelectRadioOption('agent');
		examinationTimetable.clickContinueButton();
		examinationTimetable.enterTextInField('examination-name', 'Testing Organisation');
		examinationTimetable.clickContinueButton();
		examinationTimetable.enterTextInField('examination-email', 'test@test.com');
		examinationTimetable.clickContinueButton();
	});

	it('Select first deadline and clicks continue,', () => {
		examinationTimetable.checkFirstRadioButton();
		examinationTimetable.clickContinueButton();
	});

	it('Selects first item and choose to upload comments and files', () => {
		examinationTimetable.checkFirstRadioButton();
		examinationTimetable.clickContinueButton();
		examinationTimetable.findAndSelectRadioOption('both');
		examinationTimetable.clickContinueButton();
	});

	it('Types a comment and and uploads a PDF file and submits', () => {
		examinationTimetable.typeComment('This is a test comment');
		examinationTimetable.clickContinueButton();
		cy.get('.moj-multi-file-upload__dropzone').selectFile(
			'cypress/e2e/cypress/fixtures/Testing.pdf',
			{ action: 'drag-drop' }
		);
		examinationTimetable.clickContinueUploadFile();
	});

	it('Selects yes to personal information and ticks comments and files ', () => {
		examinationTimetable.findAndSelectRadioOption('yes');
		examinationTimetable.clickContinueButton();
		cy.get('#examination-personal-information-which-comment-files').check();
		cy.get('#examination-personal-information-which-comment-files-2').check();
		examinationTimetable.clickContinueButton();
	});

	it('Checks answers are correct', () => {
		examinationTimetable.checkAnswersFirstPage([
			'Make a comment and upload files',
			'Testing.pdf',
			'This is a test comment',
			'Yes',
			'My commentTesting.pdf'
		]);
		examinationTimetable.clickContinueButton();
		examinationTimetable.findAndSelectRadioOption('no');
		examinationTimetable.clickButton('Continue');
	});

	it('Checks other answers correct and decides to change answer', () => {
		examinationTimetable.clickChangeLink(1);
	});

	it('Changes the organisation name and saves', () => {
		examinationTimetable.clearTextInField('examination-name');
		examinationTimetable.enterTextInField('examination-name', 'Test Organisation');
		examinationTimetable.clickContinueButton();
	});

	it('Decides to change email address', () => {
		examinationTimetable.clickChangeLink(2);
		examinationTimetable.clearTextInField('examination-email');
		examinationTimetable.enterTextInField('examination-email', 'tester@tester.com');
		examinationTimetable.clickContinueButton();
	});

	it('Final check that answers have updates successfully', () => {
		examinationTimetable.checkAnswersSecondtPage([
			'No',
			'On behalf of another person, a household or another organisation I do not work for',
			'Test Organisation',
			'tester@tester.com'
		]);
	});

	it('Checks other answers correct and submission can be completed', () => {
		examinationTimetable.clickButton('Submit');
		cy.wait(Cypress.env('commandDelay'));
		examinationTimetable.confirmTitleTextDisplays('Submission Complete');
	});
});
