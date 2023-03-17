const { middleware } = require('./middleware');
const { getApplicationData } = require('./documents/utils/get-application-data');

jest.mock('./documents/utils/get-application-data', () => ({
	getApplicationData: jest.fn()
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
			getApplicationData.mockReturnValue({ projectName: 'mock project name' });
			middleware(req, res, next);
		});
		it('should set the locals', () => {
			expect(res.locals).toEqual({
				baseUrl: 'mock base url',
				caseRef: 'mock-case-ref',
				path: 'mock path',
				projectName: 'mock project name',
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
						name: 'Relevant Representations (Registration comments)',
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
