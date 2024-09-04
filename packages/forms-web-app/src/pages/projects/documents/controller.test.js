const { getProjectsDocumentsController } = require('./controller');

const { mockI18n } = require('../../_mocks/i18n');
const {
	getProjectData,
	wrappedSearchDocumentsV3
} = require('../../../lib/application-api-wrapper');
const {
	searchExaminationLibraryDocument
} = require('./_utils/documents/search-examination-library-document');

jest.mock('../../../lib/application-api-wrapper', () => ({
	getProjectData: jest.fn(),
	wrappedSearchDocumentsV3: jest.fn()
}));
jest.mock('./_utils/documents/search-examination-library-document', () => ({
	searchExaminationLibraryDocument: jest.fn()
}));

const commonTranslations_EN = require('../../../locales/en/common.json');
const projectsDocumentsTranslations_EN = require('./_translations/en.json');

const i18n = mockI18n({
	common: commonTranslations_EN,
	projectsDocuments: projectsDocumentsTranslations_EN
});

describe('pages/projects/documents/controller', () => {
	describe('#getProjectsDocumentsController', () => {
		describe('When getting the documents for the document library', () => {
			describe('and there are no errors', () => {
				const req = {
					get: () => 'localhost',
					query: { page: 2 },
					params: { case_ref: 'mock-case-ref' },
					i18n
				};
				const res = { render: jest.fn(), status: jest.fn(() => res) };

				beforeEach(async () => {
					getProjectData.mockReturnValue({
						data: { ProjectName: 'mock project name' },
						resp_code: 200
					});
					wrappedSearchDocumentsV3.mockReturnValue({
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
									stageLabel: {
										cy: 'mock stage label welsh',
										en: 'mock stage label english'
									},
									filter1: 'mock filter',
									extra: 'i should be ignored'
								}
							],
							filters: [
								{
									name: 'mock filter',
									value: '1',
									label: {
										cy: 'welsh mock label',
										en: 'english mock label'
									},
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
					await getProjectsDocumentsController(req, res);
				});
				it('should return the mapped documents', () => {
					expect(res.render).toHaveBeenCalledWith(
						'projects/documents/view.njk',
						expect.objectContaining({
							documents: [
								{
									Stage: 'mock stage',
									date_published: '1 January 2022',
									description: 'mock description',
									filter_1: 'mock filter',
									mime: 'mock mime',
									path: undefined,
									personal_name: 'mock personal name',
									representative: 'mock representative',
									size: 'mock size',
									stageLabel: 'mock stage label english'
								}
							]
						})
					);
				});

				it('should return the mapped filters', () => {
					expect(res.render).toHaveBeenCalledWith(
						'projects/documents/view.njk',
						expect.objectContaining({
							filters: [
								{
									idPrefix: 'mock-filter-1',
									isOpen: false,
									items: [
										{ checked: false, text: 'mock filter value (1)', value: 'mock filter value' }
									],
									label: 'english mock label',
									name: 'mock filter-1',
									title: 'english mock label (1)',
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
												{ classes: 'govuk-input--width-2', label: 'Day', name: 'day', value: '' },
												{
													classes: 'govuk-input--width-2',
													label: 'Month',
													name: 'month',
													value: ''
												},
												{ classes: 'govuk-input--width-4', label: 'Year', name: 'year', value: '' }
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
												{ classes: 'govuk-input--width-2', label: 'Day', name: 'day', value: '' },
												{
													classes: 'govuk-input--width-2',
													label: 'Month',
													name: 'month',
													value: ''
												},
												{ classes: 'govuk-input--width-4', label: 'Year', name: 'year', value: '' }
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
					expect(res.render).toHaveBeenCalledWith('projects/documents/view.njk', {
						activeFilters: [],
						allowProjectInformation: true,
						baseUrl: '/projects/mock-case-ref',
						caseRef: 'mock-case-ref',
						displayClearAllFilters: false,
						displayFilters: true,
						documents: [
							{
								Stage: 'mock stage',
								date_published: '1 January 2022',
								description: 'mock description',
								filter_1: 'mock filter',
								mime: 'mock mime',
								path: undefined,
								personal_name: 'mock personal name',
								representative: 'mock representative',
								size: 'mock size',
								stageLabel: 'mock stage label english'
							}
						],
						errorSummary: null,
						examinationLibraryDocumentHtml:
							'<a class="govuk-link" href="mock/path">View examination library (PDF, 225KB)</a> containing document reference numbers',
						filters: [
							{
								idPrefix: 'mock-filter-1',
								isOpen: false,
								items: [
									{ checked: false, text: 'mock filter value (1)', value: 'mock filter value' }
								],
								label: 'english mock label',
								name: 'mock filter-1',
								title: 'english mock label (1)',
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
											{ classes: 'govuk-input--width-2', label: 'Day', name: 'day', value: '' },
											{ classes: 'govuk-input--width-2', label: 'Month', name: 'month', value: '' },
											{ classes: 'govuk-input--width-4', label: 'Year', name: 'year', value: '' }
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
											{ classes: 'govuk-input--width-2', label: 'Day', name: 'day', value: '' },
											{ classes: 'govuk-input--width-2', label: 'Month', name: 'month', value: '' },
											{ classes: 'govuk-input--width-4', label: 'Year', name: 'year', value: '' }
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
						langIsWelsh: false,
						pageOptions: [1, 2, 3, '...', 5, 'next'],
						pageUrl: 'documents',
						paginationData: {
							currentPage: 1,
							fromRange: 1,
							itemsPerPage: 20,
							toRange: 20,
							totalItems: 100,
							totalPages: 5
						},
						paginationUrl: 'documents?page=:page',
						projectName: 'mock project name',
						queryUrl: '',
						resultsPerPage: {
							fifty: { active: false, link: '?itemsPerPage=50', size: 50 },
							oneHundred: { active: false, link: '?itemsPerPage=100', size: 100 },
							twentyFive: { active: true, link: '?itemsPerPage=25', size: 25 }
						},
						searchTerm: undefined
					});
				});
			});
			describe('and there is an error', () => {
				const req = {
					get: () => 'localhost',
					query: {},
					params: { case_ref: 'mock-case-ref' },
					i18n
				};
				const res = { render: jest.fn(), status: jest.fn(() => res) };

				beforeEach(async () => {
					getProjectData.mockReturnValue({
						data: { ProjectName: 'mock project name' },
						resp_code: 500
					});
					await getProjectsDocumentsController(req, res);
				});
				it('should render the error page', () => {
					expect(res.status).toHaveBeenCalledWith(500);
					expect(res.render).toHaveBeenCalledWith('error/unhandled-exception');
				});
			});
		});
	});
});
