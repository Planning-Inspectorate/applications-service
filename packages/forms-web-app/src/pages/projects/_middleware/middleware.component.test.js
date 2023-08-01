const { middleware } = require('./middleware');
const { getApplicationData } = require('../documents/utils/get-application-data');
const { getTimetables } = require('../../../lib/application-api-wrapper');
const { fixturesTimetableResponse } = require('../../../services/__mocks__/timetable.fixtures');

jest.mock('../documents/utils/get-application-data', () => ({
	getApplicationData: jest.fn()
}));
jest.mock('../../../lib/application-api-wrapper', () => ({
	getTimetables: jest.fn()
}));

describe('projects _middleware', () => {
	describe('#_middleware', () => {
		const next = jest.fn();
		const req = {
			params: { case_ref: 'mock-case-ref' },
			baseUrl: 'mock base url',
			path: 'mock path'
		};
		const res = { locals: {} };
		beforeEach(() => {
			jest.useFakeTimers().setSystemTime(new Date('2023-01-02'));
			getApplicationData.mockReturnValue({ projectName: 'mock project name' });
			getTimetables.mockReturnValue(fixturesTimetableResponse);
			middleware(req, res, next);
		});
		it('should set the locals', () => {
			expect(res.locals).toEqual({
				baseUrl: 'mock base url',
				caseRef: 'mock-case-ref',
				path: 'mock path',
				projectName: 'mock project name',
				hasOpenTimetables: true,
				verticalTabs: [
					{
						hidden: true,
						id: 'examination',
						name: 'mock project name project information',
						url: '/projects/mock-case-ref'
					},
					{
						hidden: true,
						id: 'project-timeline',
						name: 'Project timeline',
						url: '/projects/project-timeline'
					},
					{
						hidden: true,
						id: 'project-documents',
						name: 'Documents',
						url: '/projects/mock-case-ref/documents'
					},
					{
						hidden: false,
						id: 'representations',
						name: 'Relevant representations (Registration comments)',
						url: '/projects/mock-case-ref/representations'
					},
					{
						hidden: true,
						id: 'project-examination-timetable',
						name: 'Examination timetable',
						url: '/projects/mock-case-ref/examination-timetable'
					},
					{
						hidden: true,
						id: 'project-have-your-say',
						name: 'Have your say',
						url: '/projects/mock-case-ref/examination/have-your-say-during-examination'
					},
					{
						hidden: true,
						id: 'get-updates',
						name: 'Get updates',
						url: '/projects/mock-case-ref/get-updates/start'
					},
					{
						hidden: true,
						id: 'all-examination-documents',
						name: 'All Examination documents',
						url: '/projects/all-examination-documents'
					},
					{
						hidden: true,
						id: 'section-51',
						name: 'Section 51 advice',
						url: '/projects/mock-case-ref/s51advice'
					}
				]
			});
		});
		it('should call next ', () => {
			expect(next).toHaveBeenCalled();
		});
	});
});
