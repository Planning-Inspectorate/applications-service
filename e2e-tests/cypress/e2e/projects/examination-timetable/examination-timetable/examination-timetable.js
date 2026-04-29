import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { LOCAL_CASES } from '../../shared/localCases';

const { stJamesBarton } = LOCAL_CASES;

Given('I open the local examination timetable page', () => {
	cy.visit(`/projects/${stJamesBarton.id}/examination-timetable`);
	cy.url().should('include', `/projects/${stJamesBarton.id}/examination-timetable`);
});

Then('the examination timetable shows no upcoming deadlines', () => {
	cy.contains('h1', 'Examination timetable').should('be.visible');
	cy.contains('Upcoming deadlines and events').should('be.visible');
	cy.contains('There are no deadlines and events').should('be.visible');
});

Then('the examination timetable shows past deadlines and events', () => {
	cy.contains('Past deadlines and events').should('be.visible');
	cy.get('#examination-timetable-events-accordion .section-events__event')
		.its('length')
		.should('be.gte', 1);
});

Then('the examination project navigation is displayed', () => {
	cy.get('nav[aria-label="Project navigation"]').within(() => {
		cy.contains('a', 'Project information').should('be.visible');
		cy.contains('Examination timetable').should('be.visible');
		cy.contains('a', 'Have your say').should('be.visible');
	});
});

When('I open the have your say journey from the examination timetable page', () => {
	cy.contains('a', 'Have your say').click();
	cy.url().should('include', '/examination/have-your-say-during-examination');
});

When('I open the local examination submission page', () => {
	cy.visit(`/projects/${stJamesBarton.id}/examination/have-your-say-during-examination`);
	cy.url().should(
		'include',
		`/projects/${stJamesBarton.id}/examination/have-your-say-during-examination`
	);
});

Then('the no open deadlines message is displayed on the examination submission page', () => {
	cy.contains('h1', 'Have your say on an application').should('be.visible');
	cy.contains('You cannot submit anything as there are no open deadlines.').should('be.visible');
});

Then('the examination submission form is not displayed', () => {
	cy.get('[data-cy="button-submit-and-continue"]').should('not.exist');
	cy.contains('What is your full name?').should('not.exist');
});
