import { PO_ExaminationTimetable } from '../pageObject/Examination-TimeTable/PO_ExaminationTimetable';
import { PO_ProjectPage } from '../pageObject/Search-and-project-pages/PO_ProjectPage';

const examinationTimetable = new PO_ExaminationTimetable();
const projectPage = new PO_ProjectPage();

describe('User registers as themselves to have their say against the examination timetable', () => {
	it('Navigates to the examination timetable page for a project and start the journey', () => {
		cy.clearCookies();
		cy.visit('/projects/BC0910150/examination-timetable');
		projectPage.findAndClickSidebarLinkLeft('Examination timetable');
		examinationTimetable.clickLink();
		examinationTimetable.clickStartNowButton();
	});

	it('Selects no for interested party number and to member of project', () => {
		examinationTimetable.findAndSelectRadioOption('no');
		examinationTimetable.clickContinueButton();
		examinationTimetable.findAndSelectRadioOption('no');
		examinationTimetable.clickContinueButton();
	});

	it('Selects myself, enters full-name and email addres and continues', () => {
		examinationTimetable.findAndSelectRadioOption('myself');
		examinationTimetable.clickContinueButton();
		examinationTimetable.enterTextInField('examination-name', 'John Tester');
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

	it('Checks answers are correct and confirm no more submission', () => {
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

	it('Checks other answers correct and submission can be completed', () => {
		examinationTimetable.checkAnswersSecondPage(['No', 'Myself', 'John Tester', 'test@test.com']);
		examinationTimetable.clickButton('Submit');
		examinationTimetable.confirmTitleTextDisplays('Submission Complete');
	});
});
