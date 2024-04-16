const { projectsMiddleware } = require('./middleware');
const { getApplicationData } = require('../_utils/get-application-data');
const { getVerticalTabs } = require('./_utils/get-vertical-tabs');
const { getTimetables } = require('../../../lib/application-api-wrapper');
const { fixturesTimetableResponse } = require('../../../services/__mocks__/timetable.fixtures');

jest.mock('../_utils/get-application-data', () => ({
	getApplicationData: jest.fn()
}));
jest.mock('./_utils/get-vertical-tabs', () => ({
	getVerticalTabs: jest.fn()
}));
jest.mock('../../../lib/application-api-wrapper', () => ({
	getTimetables: jest.fn()
}));

describe('projects _middleware', () => {
	describe('#projectsMiddleware', () => {
		const next = jest.fn();
		const req = {
			params: { case_ref: 'mock-case-ref' },
			baseUrl: 'mock base url',
			path: 'mock path',
			session: {}
		};
		const res = { locals: {} };
		beforeEach(() => {
			jest.useFakeTimers().setSystemTime(new Date('2023-01-02'));
			getApplicationData.mockReturnValue({
				projectName: 'mock project name',
				DateOfRepresentationPeriodOpen: '2023-01-03',
				DateOfRelevantRepresentationClose: '2023-01-04'
			});
			getVerticalTabs.mockReturnValue([
				{
					hidden: true,
					id: 'project-information',
					name: 'Project information',
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
					hidden: true,
					id: 'register-index',
					name: 'Register to have your say',
					url: '/projects/mock-case-ref/register/register-have-your-say'
				},
				{
					hidden: true,
					id: 'representations',
					name: 'Relevant representations (registration comments)',
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
			]);
			getTimetables.mockReturnValue(fixturesTimetableResponse);
			projectsMiddleware(req, res, next);
		});
		it('should set the locals', () => {
			expect(res.locals).toEqual({
				applicationData: {
					DateOfRepresentationPeriodOpen: '2023-01-03',
					DateOfRelevantRepresentationClose: '2023-01-04',
					projectName: 'mock project name'
				},
				baseUrl: 'mock base url',
				caseRef: 'mock-case-ref',
				path: 'mock path',
				projectName: 'mock project name',
				projectStages: {
					1: 'Pre-application',
					2: 'Acceptance',
					3: 'Pre-examination',
					4: 'Examination',
					5: 'Recommendation',
					6: 'Decision',
					7: 'Post-decision',
					8: 'Withdrawn'
				},
				verticalTabs: [
					{
						hidden: true,
						id: 'project-information',
						name: 'Project information',
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
						hidden: true,
						id: 'register-index',
						name: 'Register to have your say',
						url: '/projects/mock-case-ref/register/register-have-your-say'
					},
					{
						hidden: true,
						id: 'representations',
						name: 'Relevant representations (registration comments)',
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
						hidden: false,
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
