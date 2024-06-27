const projectsTranslations__EN = require('./en.json');

describe('pages/projects/_translations/en', () => {
	it('should return the english projects translations', () => {
		expect(projectsTranslations__EN).toEqual({
			navigation: {
				index: 'Project information',
				documents: 'Documents',
				register: 'Register to have your say',
				representations: 'Relevant representations (registration comments)',
				examinationTimetable: 'Examination timetable',
				haveYourSay: 'Have your say',
				getUpdates: 'Get updates',
				section51: 'Section 51 advice'
			}
		});
	});
});
