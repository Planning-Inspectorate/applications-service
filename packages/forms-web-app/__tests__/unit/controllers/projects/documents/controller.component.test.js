const {
	getApplicationDocuments
} = require('../../../../../src/controllers/projects/docments/controller');
const { searchDocumentsV3 } = require('../../../../../src/services/document.service');
const { getAppData } = require('../../../../../src/services/application.service');

jest.mock('../../../../../src/services/application.service', () => ({
	getAppData: jest.fn()
}));
jest.mock('../../../../../src/services/document.service', () => ({
	searchDocumentsV3: jest.fn()
}));
describe('#getApplicationDocuments', () => {
	describe('When getting the documents for the document library', () => {
		describe('and there are no errors', () => {
			const req = {
				get: () => 'localhost',
				query: {},
				params: { case_ref: 'mock-case-ref' }
			};
			const res = { render: jest.fn(), status: jest.fn(() => res) };

			beforeEach(async () => {
				getAppData.mockReturnValue({ data: { ProjectName: 'mock project name' }, resp_code: 200 });
				searchDocumentsV3.mockReturnValue({
					data: {
						documents: [
							{
								datePublished: '2022-01-01',
								description: 'mock description',
								personalName: 'mock personal name',
								mime: 'mock mime',
								size: 'mock size',
								representative: 'mock representative',
								stage: 'mock stage',
								filter1: 'mock filter',
								extra: 'i should be ignored'
							}
						],
						filters: [
							{
								name: 'mock filter',
								value: '1',
								label: 'mock label',
								count: 1,
								type: [{ value: 'mock filter value', count: '1' }]
							}
						],
						totalItems: 100,
						itemsPerPage: 20,
						totalPages: 5,
						currentPage: 1
					}
				});
				await getApplicationDocuments(req, res);
			});
			it('should return the mapped documents', () => {
				expect(res.render).toHaveBeenCalledWith(
					'projects/documents',
					expect.objectContaining({
						documents: [
							{
								date_published: '1 January 2022',
								description: 'mock description',
								personal_name: 'mock personal name',
								mime: 'mock mime',
								size: 'mock size',
								representative: 'mock representative',
								Stage: 'mock stage',
								filter_1: 'mock filter'
							}
						]
					})
				);
			});
			it('should return the mapped filters', () => {
				expect(res.render).toHaveBeenCalledWith(
					'projects/documents',
					expect.objectContaining({
						filters: [
							{
								idPrefix: 'mock filter-1',
								items: [
									{ checked: false, text: 'mock filter value (1)', value: 'mock filter value' }
								],
								name: 'mock filter-1',
								title: 'mock label (1)'
							}
						]
					})
				);
			});
			it('should return the view and page data', () => {
				expect(res.render).toHaveBeenCalledWith('projects/documents', {
					baseUrl: '/projects/mock-case-ref',
					caseRef: 'mock-case-ref',
					documents: [
						{
							date_published: '1 January 2022',
							description: 'mock description',
							personal_name: 'mock personal name',
							mime: 'mock mime',
							size: 'mock size',
							representative: 'mock representative',
							Stage: 'mock stage',
							filter_1: 'mock filter'
						}
					],
					filters: [
						{
							idPrefix: 'mock filter-1',
							items: [
								{ checked: false, text: 'mock filter value (1)', value: 'mock filter value' }
							],
							name: 'mock filter-1',
							title: 'mock label (1)'
						}
					],
					hideAllExaminationDocumentsLink: true,
					hideExaminationTimetableLink: true,
					hideProjectInformationLink: true,
					hideRecommendationAndDecisionLink: true,
					pageOptions: [1, 2, 3, '...', 5, 'next'],
					pageUrl: 'application-documents',
					paginationData: {
						itemsPerPage: 20,
						toRange: 20,
						totalItems: 100,
						totalPages: 5,
						currentPage: 1,
						fromRange: 1
					},
					paginationUrl: 'application-documents?page=:page',
					projectName: 'mock project name',
					queryUrl: '',
					searchTerm: undefined
				});
			});
		});
		describe('and there is an error', () => {
			const req = {
				get: () => 'localhost',
				query: {},
				params: { case_ref: 'mock-case-ref' }
			};
			const res = { render: jest.fn(), status: jest.fn(() => res) };

			beforeEach(async () => {
				getAppData.mockReturnValue({ data: { ProjectName: 'mock project name' }, resp_code: 500 });
				await getApplicationDocuments(req, res);
			});
			it('should render the error page', () => {
				expect(res.render).toHaveBeenCalledWith('error/unhandled-exception');
			});
		});
	});
});
