const {
	projectsExaminationTimetableRoute,
	examinationTimetableI18nNamespace
} = require('./config');

describe('pages/projects/examination-timetable/config', () => {
	describe('#projectsExaminationTimetableRoute', () => {
		it('should return the projects examination timetable route', () => {
			expect(projectsExaminationTimetableRoute).toEqual('examination-timetable');
		});
		it('should return the projects examination timetable namespace', () => {
			expect(examinationTimetableI18nNamespace).toEqual('examinationTimetable');
		});
	});
});
