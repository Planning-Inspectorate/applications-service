const { getShowExaminationLink } = require('./get-show-examination-link');

const { getTimetables } = require('../../../../lib/application-api-wrapper');

jest.mock('../../../../lib/application-api-wrapper', () => ({
	getTimetables: jest.fn()
}));

describe('pages/projects/_middleware/_utils/get-show-examination-link', () => {
	describe('#getShowExaminationLink', () => {
		describe('When determining when to show or hide the examination timetable link', () => {
			describe('and the has project timetables value is in the session', () => {
				describe('and the url is the project information page url', () => {
					describe('and the projects has timetables session value is set to false', () => {
						describe('and the timetable api returns timetables', () => {
							const mockPath = '/projects/ABC123';
							const mockCaseRef = 'ABC123';
							const mockSession = { hasTimetables: { ABC123: false } };

							let showExaminationLink;

							beforeEach(async () => {
								getTimetables.mockReturnValue({
									data: { timetables: ['mock timetable 1', 'mock timetable 2'] }
								});
								showExaminationLink = await getShowExaminationLink(
									mockPath,
									mockSession,
									mockCaseRef
								);
							});

							it('should set showExaminationLink to true', () => {
								expect(showExaminationLink).toEqual(true);
							});

							it('should call the api', () => {
								expect(getTimetables).toBeCalled();
							});
						});
					});
				});

				describe('and the url is not the project information page url', () => {
					const mockPath = '/projects/ABC123/not-project-information-page';
					const mockCaseRef = 'ABC123';
					const mockSession = { hasTimetables: { ABC123: false } };

					let showExaminationLink;

					beforeEach(async () => {
						showExaminationLink = await getShowExaminationLink(mockPath, mockSession, mockCaseRef);
					});

					it('should set showExaminationLink to the projects has timetables session value', () => {
						expect(showExaminationLink).toEqual(false);
					});

					it('should not call the api', () => {
						expect(getTimetables).not.toBeCalled();
					});
				});
			});

			describe('and the has project timetables value is not in the session', () => {
				const mockPath = '/projects/ABC123/not-project-information-page';
				const mockCaseRef = 'ABC123';
				const mockSession = { hasTimetables: { DEF321: false } };

				let showExaminationLink;

				beforeEach(async () => {
					getTimetables.mockReturnValue({
						data: { timetables: ['mock timetable 1', 'mock timetable 2'] }
					});
					showExaminationLink = await getShowExaminationLink(mockPath, mockSession, mockCaseRef);
				});

				it('should set showExaminationLink to true', () => {
					expect(showExaminationLink).toEqual(true);
				});
			});
		});
	});
});
