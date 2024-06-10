const { projectsMiddleware } = require('./middleware');
const { getApplicationData } = require('../_utils/get-application-data');
const { getTimetables } = require('../../../lib/application-api-wrapper');
const { fixturesTimetableResponse } = require('../../../services/__mocks__/timetable.fixtures');
const { mockI18n } = require('../../_mocks/i18n');

jest.mock('../_utils/get-application-data', () => ({
	getApplicationData: jest.fn()
}));
jest.mock('../../../lib/application-api-wrapper', () => ({
	getTimetables: jest.fn()
}));
jest.mock('../../../config', () => {
	const originalConfig = jest.requireActual('../../../config');
	return {
		...originalConfig,
		featureFlag: {
			...originalConfig.featureFlag,
			allowProjectInformation: false,
			hideProjectTimelineLink: false,
			hideAllExaminationDocumentsLink: false
		}
	};
});

describe('projects _middleware', () => {
	describe('#projectsMiddleware', () => {
		const next = jest.fn();
		const req = {
			params: { case_ref: 'mock-case-ref' },
			baseUrl: 'mock base url',
			path: 'mock path',
			session: {},
			i18n: {
				...mockI18n({}),
				language: 'mock-language'
			}
		};
		const res = { locals: {} };
		beforeEach(() => {
			jest.useFakeTimers().setSystemTime(new Date('2023-01-02'));
			getApplicationData.mockReturnValue({
				projectName: 'mock project name',
				DateOfRepresentationPeriodOpen: '2023-01-03',
				DateOfRelevantRepresentationClose: '2023-01-04'
			});
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
						hidden: false,
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
						hidden: false,
						id: 'project-examination-timetable',
						name: 'Examination timetable',
						url: '/projects/mock-case-ref/examination-timetable'
					},
					{
						hidden: false,
						id: 'project-have-your-say',
						name: 'Have your say',
						url: '/projects/mock-case-ref/examination/have-your-say-during-examination'
					},
					{
						hidden: false,
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
