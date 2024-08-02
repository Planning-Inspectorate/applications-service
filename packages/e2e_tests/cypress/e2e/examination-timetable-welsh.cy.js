import { BasePage } from '../pageObject/basePage';
import { PO_ExaminationTimetable } from '../pageObject/Examination-TimeTable/PO_ExaminationTimetable';

const examinationTimetable = new PO_ExaminationTimetable();
const basePage = new BasePage();

describe('Examination timetable in Welsh', () => {
	it('Navigates to the exam timetable and switches to Welsh mode', () => {
		cy.clearCookies();
		cy.visit('/projects/EN0110165/examination-timetable');
		basePage.localeSwitcher('cy').click();
	});

	it('Shows all sections and finds a timetable item in Welsh', () => {
		examinationTimetable.showAllsections();
		examinationTimetable
			.getAllEvents()
			.get('.section-events__event-title')
			.contains('1 Ionawr 2050 - Test item 1 - Welsh');
	});

	it('Can complete the Have Your Say journey', () => {
		cy.clearCookies();
		examinationTimetable.clickLink();
	});
});
