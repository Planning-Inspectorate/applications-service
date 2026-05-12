import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import PO_ExaminationTimetable from '../PageObjects/PO_ExaminationTimetable';
import { LOCAL_CASES } from '../../shared/localCases';

const examinationTimetable = new PO_ExaminationTimetable();
const { stJamesBarton } = LOCAL_CASES;

Given('I open the local examination timetable page', () => {
	examinationTimetable.openTimetablePage(stJamesBarton.id);
	examinationTimetable.assertOnTimetablePage(stJamesBarton.id);
});

Then('the examination timetable shows no upcoming deadlines', () => {
	examinationTimetable.assertNoUpcomingDeadlinesState();
});

Then('the examination timetable shows past deadlines and events', () => {
	examinationTimetable.assertPastDeadlinesState();
});

Then('the examination project navigation is displayed', () => {
	examinationTimetable.assertProjectNavigation();
});

When('I open the have your say journey from the examination timetable page', () => {
	examinationTimetable.openHaveYourSayJourney();
	examinationTimetable.assertOnSubmissionPage(stJamesBarton.id);
});

When('I open the local examination submission page', () => {
	examinationTimetable.openSubmissionPage(stJamesBarton.id);
	examinationTimetable.assertOnSubmissionPage(stJamesBarton.id);
});

Then('the no open deadlines message is displayed on the examination submission page', () => {
	examinationTimetable.assertNoOpenDeadlinesMessage();
});

Then('the examination submission form is not displayed', () => {
	examinationTimetable.assertSubmissionFormHidden();
});
