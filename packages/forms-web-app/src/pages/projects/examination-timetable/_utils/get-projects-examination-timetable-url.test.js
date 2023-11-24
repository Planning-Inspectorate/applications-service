const { getProjectsExaminationTimetableURL } = require('./get-projects-examination-timetable-url');

describe('pages/projects/examination-timetable/_utils/get-projects-examination-timetable-url', () => {
	describe('#getProjectsExaminationTimetableURL', () => {
		describe('When getting the projects examination timetable URL', () => {
			describe('and a case reference is not provided', () => {
				const projectsExaminationTimetableURL = getProjectsExaminationTimetableURL();
				it('should return the projects examination timetable URL with the route parameters', () => {
					expect(projectsExaminationTimetableURL).toEqual(
						'/projects/:case_ref/examination-timetable'
					);
				});
			});
			describe('and a case reference is provided', () => {
				const projectsExaminationTimetableURL =
					getProjectsExaminationTimetableURL('mock-case-reference');
				it('should return the projects examination timetable URL with the case reference', () => {
					expect(projectsExaminationTimetableURL).toEqual(
						'/projects/mock-case-reference/examination-timetable'
					);
				});
			});
		});
	});
});
