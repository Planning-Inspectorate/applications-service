///<reference types ="cypress" />
import { Given } from 'cypress-cucumber-preprocessor/steps';
import PO_HaveYourSay from '../../../pageObject/Register-to-have-your-say/PO_HaveYourSay';
import PO_ExaminationTimetable from '../../../pageObject/Examination-TimeTable/PO_ExaminationTimetable';
import PO_Documents from '../../../pageObject/Documents/PO_Documents';
const documents = new PO_Documents();

const haveYourSay = new PO_HaveYourSay();
const examTimetable = new PO_ExaminationTimetable();

Given('I navigate to the submission start page', () => {
	cy.visit('/projects', { failOnStatusCode: false });
	examTimetable.clickOnHerf();
	examTimetable.timeTableLink(); //TimeTable link
	examTimetable.makeSubmissionButton(); //Start the submission
	cy.url().should('include', 'examination/have-your-say-during-examination'); // Verify user is on submission page
});

Given('I navigate to the registration start page', () => {
	cy.visit('/projects', { failOnStatusCode: false });
	haveYourSay.clickOnHerf();
	haveYourSay.registerButton(); // Register to have your say - Start page
	cy.url().should('include', 'register-have-your-say'); // Verify user is on have your say page
	haveYourSay.startNowButton();
});

Given('A user has navigated to the document page', () => {
	cy.visit('/projects', { failOnStatusCode: false });
	documents.clickOnHerfProjectLink();
	documents.documentsLink();
	cy.url().should('include', 'documents'); // Verify user is on documents page
});
