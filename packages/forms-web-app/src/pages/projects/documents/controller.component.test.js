const { getApplicationDocuments } = require('./controller');
const { searchDocumentsV3 } = require('../../../services/document.service');
const { getAppData } = require('../../../services/application.service');
const {
	searchExaminationLibraryDocument
} = require('./utils/documents/search-examination-library-document');

jest.mock('../../../services/application.service', () => ({
	getAppData: jest.fn()
}));
jest.mock('../../../services/document.service', () => ({
	searchDocumentsV3: jest.fn()
}));
jest.mock('./utils/documents/search-examination-library-document', () => ({
	searchExaminationLibraryDocument: jest.fn()
}));

describe('#getApplicationDocuments', () => {
	describe('When getting the documents for the document library', () => {
		describe('and there are no errors', () => {
			const req = {
				get: () => 'localhost',
				query: { page: 2 },
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
				searchExaminationLibraryDocument.mockReturnValue({
					mime: 'application/pdf',
					path: 'mock/path',
					size: '224630'
				});
				await getApplicationDocuments(req, res);
			});
			it('should return the mapped documents', () => {
				expect(res.render).toHaveBeenCalledWith(
					'projects/documents/index.njk',
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
					'projects/documents/index.njk',
					expect.objectContaining({
						filters: [
							{
								idPrefix: 'mock-filter-1',
								isOpen: false,
								label: 'mock label',
								items: [
									{ checked: false, text: 'mock filter value (1)', value: 'mock filter value' }
								],
								name: 'mock filter-1',
								title: 'mock label (1)',
								type: 'checkbox'
							},
							{
								errorSummary: null,
								formGroups: [
									{
										errorMessage: null,
										errorMessageTitle: 'from',
										id: 'docments-page-date-from-form-group',
										inputNamePrefix: 'date-from',
										inputs: [
											{
												classes: 'govuk-input--width-2',
												name: 'day',
												value: ''
											},
											{
												classes: 'govuk-input--width-2',
												name: 'month',
												value: ''
											},
											{
												classes: 'govuk-input--width-4',
												name: 'year',
												value: ''
											}
										],
										name: 'date-from',
										title: 'From'
									},
									{
										errorMessage: null,
										errorMessageTitle: 'to',
										id: 'docments-page-date-to-form-group',
										inputNamePrefix: 'date-to',
										inputs: [
											{
												classes: 'govuk-input--width-2',
												name: 'day',
												value: ''
											},
											{
												classes: 'govuk-input--width-2',
												name: 'month',
												value: ''
											},
											{
												classes: 'govuk-input--width-4',
												name: 'year',
												value: ''
											}
										],
										name: 'date-to',
										title: 'To'
									}
								],
								isOpen: false,
								title: 'Date published',
								type: 'date'
							}
						]
					})
				);
			});
			it('should return the view and page data', () => {
				expect(res.render).toHaveBeenCalledWith('projects/documents/index.njk', {
					baseUrl: '/projects/mock-case-ref',
					caseRef: 'mock-case-ref',
					displayClearAllFilters: false,
					displayFilters: true,
					errorSummary: null,
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
					examinationLibraryDocumentHtml:
						'<p><a class="govuk-link" href="mock/path">View examination library (PDF, 225KB)</a> containing document reference numbers</p>',
					filters: [
						{
							idPrefix: 'mock-filter-1',
							isOpen: false,
							label: 'mock label',
							items: [
								{ checked: false, text: 'mock filter value (1)', value: 'mock filter value' }
							],
							name: 'mock filter-1',
							title: 'mock label (1)',
							type: 'checkbox'
						},
						{
							errorSummary: null,
							formGroups: [
								{
									errorMessage: null,
									errorMessageTitle: 'from',
									id: 'docments-page-date-from-form-group',
									inputNamePrefix: 'date-from',
									inputs: [
										{
											classes: 'govuk-input--width-2',
											name: 'day',
											value: ''
										},
										{
											classes: 'govuk-input--width-2',
											name: 'month',
											value: ''
										},
										{
											classes: 'govuk-input--width-4',
											name: 'year',
											value: ''
										}
									],
									name: 'date-from',
									title: 'From'
								},
								{
									errorMessage: null,
									errorMessageTitle: 'to',
									id: 'docments-page-date-to-form-group',
									inputNamePrefix: 'date-to',
									inputs: [
										{
											classes: 'govuk-input--width-2',
											name: 'day',
											value: ''
										},
										{
											classes: 'govuk-input--width-2',
											name: 'month',
											value: ''
										},
										{
											classes: 'govuk-input--width-4',
											name: 'year',
											value: ''
										}
									],
									name: 'date-to',
									title: 'To'
								}
							],
							isOpen: false,
							title: 'Date published',
							type: 'date'
						}
					],
					activeFilters: [],
					hideAllExaminationDocumentsLink: true,
					hideProjectInformationLink: true,
					pageOptions: [1, 2, 3, '...', 5, 'next'],
					pageUrl: 'documents',
					paginationData: {
						itemsPerPage: 20,
						toRange: 20,
						totalItems: 100,
						totalPages: 5,
						currentPage: 1,
						fromRange: 1
					},
					paginationUrl: 'documents?page=:page',
					projectName: 'mock project name',
					queryUrl: '',
					searchTerm: undefined,
					title: 'Documents',
					pageTitle: 'Documents | mock project name',
					resultsPerPage: {
						fifty: {
							link: '?itemsPerPage=50',
							size: 50,
							active: false
						},
						oneHundred: {
							link: '?itemsPerPage=100',
							size: 100,
							active: false
						},
						twentyFive: {
							link: '?itemsPerPage=25',
							size: 25,
							active: true
						}
					}
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
				expect(res.status).toHaveBeenCalledWith(500);
				expect(res.render).toHaveBeenCalledWith('error/unhandled-exception');
			});
		});
	});
});
