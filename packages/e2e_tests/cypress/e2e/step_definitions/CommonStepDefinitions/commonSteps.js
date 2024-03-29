///<reference types ="cypress" />
import { Given } from 'cypress-cucumber-preprocessor/steps';
import PO_HaveYourSay from '../../../pageObject/Register-to-have-your-say/PO_HaveYourSay';
import PO_ExaminationTimetable from '../../../pageObject/Examination-TimeTable/PO_ExaminationTimetable';

const haveYourSay = new PO_HaveYourSay();
const examTimetable = new PO_ExaminationTimetable();

Given('I navigate to the submission start page', () => {
	cy.visit('/projects', { failOnStatusCode: false });
	haveYourSay.clickOnHerf();
	examTimetable.timeTableLink(); //TimeTable link
	examTimetable.makeSubmissionButton(); //Start the submission
	cy.url().should('include', 'examination/have-your-say-during-examination'); // Verify user is on submission page
});

Given('I navigate to the registration start page', () => {
	cy.visit('/projects', { failOnStatusCode: false });
	haveYourSay.clickOnHerf();
	haveYourSay.registerButton(); // Register to have your say - Start page
	cy.url().should('include', 'register-have-your-say/EN010118'); // Verify user is on have your say page
	haveYourSay.startNowButton();
});

Given('A user has navigated to the document Filter page', () => {
	cy.visit('/projects', { failOnStatusCode: false });
	cy.get("a[href='/projects/EN010021']").click();
	cy.get("a[href='/projects/EN010021/documents']").click();
	cy.url().should('include', 'EN010021/documents'); // Verify user is on documents page
});
