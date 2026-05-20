import { BasePage } from '../../shared/PageObjects/BasePage';

class PO_ExaminationTimetable extends BasePage {
	identifiers = {
		...this.identifiers,
		pageHeading: () => cy.get('h1'),
		pastEvents: () => cy.get('#examination-timetable-events-accordion .section-events__event'),
		projectNavigation: () => cy.get('nav[aria-label="Project navigation"]'),
		submissionContinueButton: () => cy.get('[data-cy="button-submit-and-continue"]')
	};

	openTimetablePage(caseId) {
		cy.visit(`/projects/${caseId}/examination-timetable`);
	}

	assertOnTimetablePage(caseId) {
		cy.url().should('include', `/projects/${caseId}/examination-timetable`);
	}

	assertNoUpcomingDeadlinesState() {
		this.identifiers.pageHeading().contains('Examination timetable').should('be.visible');
		cy.contains('Upcoming deadlines and events').should('be.visible');
		cy.contains('There are no deadlines and events').should('be.visible');
	}

	assertPastDeadlinesState() {
		cy.contains('Past deadlines and events').should('be.visible');
		this.identifiers.pastEvents().its('length').should('be.gte', 1);
	}

	assertProjectNavigation() {
		this.identifiers.projectNavigation().within(() => {
			cy.contains('a', 'Project information').should('be.visible');
			cy.contains('Examination timetable').should('be.visible');
			cy.contains('a', 'Have your say').should('be.visible');
		});
	}

	openHaveYourSayJourney() {
		this.identifiers.projectNavigation().within(() => {
			cy.contains('a', 'Have your say').click();
		});
	}

	assertOnSubmissionPage(caseId) {
		cy.url().should('include', `/projects/${caseId}/examination/have-your-say-during-examination`);
	}

	openSubmissionPage(caseId) {
		cy.visit(`/projects/${caseId}/examination/have-your-say-during-examination`);
	}

	assertNoOpenDeadlinesMessage() {
		this.identifiers.pageHeading().contains('Have your say on an application').should('be.visible');
		cy.contains('You cannot submit anything as there are no open deadlines.').should('be.visible');
	}

	assertSubmissionFormHidden() {
		this.identifiers.submissionContinueButton().should('not.exist');
		cy.contains('What is your full name?').should('not.exist');
	}
}

export default PO_ExaminationTimetable;
