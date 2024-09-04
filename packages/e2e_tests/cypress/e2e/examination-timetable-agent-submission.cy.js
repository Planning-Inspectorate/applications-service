import { BasePage } from '../pageObject/basePage';
import { PO_ExaminationTimetable } from '../pageObject/Examination-TimeTable/PO_ExaminationTimetable';

const examinationTimetable = new PO_ExaminationTimetable();
const basePage = new BasePage();

before(() => {
	cy.clearCookies();
});

describe('Agent has their say against the examination timetable', () => {
	it('Navigates to the examination timetable page for a project and start the journey', () => {
		cy.visit('/projects/BC0910150/examination-timetable');
		basePage.clickProjectInformationMenuLink('have-your-say');
		examinationTimetable.clickStartNowButton();
	});

	it('Selects no for interested party number and to member of project', () => {
		basePage.checkGovRadioBtn('no');
		basePage.clickContiuneBtn();
		basePage.checkGovRadioBtn('no');
		basePage.clickContiuneBtn();
	});

	it('Selects Agent, enters organisation name and email addres and continues', () => {
		basePage.checkGovRadioBtn('agent');
		basePage.clickContiuneBtn();
		basePage.govInputType('Testing Organisation');
		basePage.clickContiuneBtn();
		basePage.govInputType('test@test.com');
		basePage.clickContiuneBtn();
	});

	it('Select first deadline and clicks continue,', () => {
		examinationTimetable.checkFirstRadioButton();
		basePage.clickContiuneBtn();
	});

	it('Selects first item and choose to upload comments and files', () => {
		examinationTimetable.checkFirstRadioButton();
		basePage.clickContiuneBtn();
		basePage.checkGovRadioBtn('both');
		basePage.clickContiuneBtn();
	});

	it('Types a comment and and uploads a PDF file and submits', () => {
		examinationTimetable.typeComment('This is a test comment');
		basePage.clickContiuneBtn();
		cy.get('.moj-multi-file-upload__dropzone').selectFile(
			'cypress/e2e/cypress/fixtures/Testing.pdf',
			{ action: 'drag-drop' }
		);
		examinationTimetable.clickContinueUploadFile();
	});

	it('Selects yes to personal information and ticks comments and files ', () => {
		basePage.checkGovRadioBtn('yes');
		basePage.clickContiuneBtn();
		cy.get('#examination-personal-information-which-comment-files').check();
		cy.get('#examination-personal-information-which-comment-files-2').check();
		basePage.clickContiuneBtn();
	});

	it('Checks answers are correct', () => {
		examinationTimetable.checkAnswersFirstPage([
			'Make a comment and upload files',
			'Testing.pdf',
			'This is a test comment',
			'Yes',
			'My commentTesting.pdf'
		]);
		basePage.clickContiuneBtn();
		basePage.checkGovRadioBtn('no');
		examinationTimetable.clickButton('Continue');
	});

	it('Checks other answers correct and decides to change answer', () => {
		examinationTimetable.clickChangeLink(1);
	});

	it('Changes the organisation name and saves', () => {
		examinationTimetable.clearTextInField('examination-name');
		basePage.govInputType('Test Organisation');
		basePage.clickContiuneBtn();
	});

	it('Decides to change email address', () => {
		examinationTimetable.clickChangeLink(2);
		examinationTimetable.clearTextInField('examination-email');
		basePage.govInputType('tester@tester.com');
		basePage.clickContiuneBtn();
	});

	it('Final check that answers have updates successfully', () => {
		examinationTimetable.checkAnswersSecondPage([
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
