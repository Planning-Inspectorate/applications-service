class PO_ExaminationTimetable {
	identifiers = {
		pageHeading: () => cy.get('h1'),
		bodyText: () => cy.get('body'),
		pastEvents: () => cy.get('#examination-timetable-events-accordion .section-events__event'),
		projectNavigation: () => cy.get('nav[aria-label="Project navigation"]'),
		submissionContinueButton: () => cy.get('[data-cy="button-submit-and-continue"]')
	};

	get functions() {
		return new Proxy(
			{},
			{
				get: (_, prop) => {
					const value = this[prop];
					if (typeof value !== 'function') {
						throw new Error(`Function "${String(prop)}" was not found on ${this.constructor.name}`);
					}
					return value.bind(this);
				}
			}
		);
	}

	openTimetablePage(caseId) {
		cy.visit(`/projects/${caseId}/examination-timetable`);
	}

	assertOnTimetablePage(caseId) {
		cy.url().should('include', `/projects/${caseId}/examination-timetable`);
	}

	assertNoUpcomingDeadlinesState() {
		this.identifiers.pageHeading().contains('Examination timetable').should('be.visible');
		this.identifiers.bodyText().should('contain.text', 'Upcoming deadlines and events');
		this.identifiers.bodyText().should('contain.text', 'There are no deadlines and events');
	}

	assertPastDeadlinesState() {
		this.identifiers.bodyText().should('contain.text', 'Past deadlines and events');
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
		this.identifiers
			.bodyText()
			.should('contain.text', 'You cannot submit anything as there are no open deadlines.');
	}

	assertSubmissionFormHidden() {
		this.identifiers.submissionContinueButton().should('not.exist');
		this.identifiers.bodyText().should('not.contain.text', 'What is your full name?');
	}
}

export default PO_ExaminationTimetable;
