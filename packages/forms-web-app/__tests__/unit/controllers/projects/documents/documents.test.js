const aboutTheApplicationController = require('../../../../../src/controllers/projects/documents/documents');
const { searchDocumentListV2 } = require('../../../../../src/lib/application-api-wrapper');
const { getAppData } = require('../../../../../src/services/application.service');
const { mockReq, mockRes } = require('../../../mocks');
const { VIEW } = require('../../../../../src/lib/views');
const { featureHideLink } = require('../../../../../src/config');

const {
	hideProjectInformationLink,
	hideAllExaminationDocumentsLink,
	hideRecommendationAndDecisionLink,
	hideExaminationTimetableLink
} = featureHideLink;

const modifiedStageFiltersValue = [
	{
		checked: false,
		text: 'Pre-application (0)',
		value: '1'
	},
	{
		checked: false,
		text: 'Acceptance (review of the application) (0)',
		value: '2'
	},
	{
		checked: false,
		text: 'Pre-examination (0)',
		value: '3'
	},
	{
		checked: false,
		text: 'Examination (0)',
		value: '4'
	},
	{
		checked: false,
		text: 'Recommendation and decision (0)',
		value: '5'
	},
	{
		checked: false,
		text: 'Decided (0)',
		value: '7'
	}
];
jest.mock('../../../../../src/lib/application-api-wrapper');
jest.mock('../../../../../src/services/application.service');

describe('controllers/documents', () => {
	let req;
	let res;
	const docList = [
		{
			case_reference: 'ABCD1234',
			Stage: 1,
			type: 'test',
			date_published: '',
			path: 'https://nitestaz.planninginspectorate.gov.uk/wp-content/ipc/uploads/projects/ABC'
		},
		{
			case_reference: 'ABCD1234',
			Stage: 1,
			type: 'Examination Library',
			date_published: '',
			path: 'https://nitestaz.planninginspectorate.gov.uk/wp-content/ipc/uploads/projects/DEF'
		}
	];

	beforeEach(() => {
		jest.resetAllMocks();
		req = {
			...mockReq(),
			params: {
				page: '1',
				case_ref: 'ABCD1234'
			},
			url: '/abc?xyz',
			query: ''
		};
		res = mockRes();

		searchDocumentListV2.mockImplementation(() =>
			Promise.resolve({
				resp_code: 200,
				data: {
					documents: [
						{
							case_reference: 'ABCD1234',
							Stage: 1,
							type: 'test',
							path: 'https://nitestaz.planninginspectorate.gov.uk/wp-content/ipc/uploads/projects/ABC'
						},
						{
							case_reference: 'ABCD1234',
							Stage: 1,
							type: 'Examination Library',
							path: 'https://nitestaz.planninginspectorate.gov.uk/wp-content/ipc/uploads/projects/DEF'
						}
					],
					filters: {
						stageFilters: [],
						typeFilters: [],
						categoryFilters: []
					},
					totalItems: 2,
					itemsPerPage: 20,
					totalPages: 1,
					currentPage: 1
				}
			})
		);

		getAppData.mockImplementation(() =>
			Promise.resolve({
				resp_code: 200,
				data: {
					ProjectName: 'St James Barton Giant Wind Turbine'
				}
			})
		);
	});

	describe('getApplicationDocuments', () => {
		it('should call the correct template', async () => {
			await aboutTheApplicationController.getApplicationDocuments(req, res);
			expect(res.render).toHaveBeenCalledWith(VIEW.PROJECTS.DOCUMENTS, {
				documents: [docList[1], docList[0]],
				paginationUrl: '/projects/ABCD1234/application-documents?page=:page',
				projectName: 'St James Barton Giant Wind Turbine',
				baseUrl: '/projects/ABCD1234',
				caseRef: 'ABCD1234',
				hideProjectInformationLink,
				hideAllExaminationDocumentsLink,
				hideRecommendationAndDecisionLink,
				hideExaminationTimetableLink,
				modifiedStageFilters: modifiedStageFiltersValue,
				modifiedCategoryFilters: [],
				modifiedTypeFilters: [],
				pageOptions: [1],
				queryUrl: '',
				searchTerm: undefined,
				pageUrl: '/projects/ABCD1234/application-documents',
				paginationData: {
					currentPage: 1,
					fromRange: 1,
					itemsPerPage: 20,
					toRange: docList.length,
					totalItems: docList.length,
					totalPages: 1
				}
			});
		});

		it('should handle an empty result list', async () => {
			searchDocumentListV2.mockImplementation(() =>
				Promise.resolve({
					resp_code: 200,
					data: {
						documents: [],
						filters: {
							stageFilters: [],
							typeFilters: [],
							categoryFilters: []
						},
						totalItems: 1,
						itemsPerPage: 20,
						totalPages: 1,
						currentPage: 1
					}
				})
			);
			await aboutTheApplicationController.getApplicationDocuments(req, res);
			expect(res.render).toHaveBeenCalledWith(VIEW.PROJECTS.DOCUMENTS, {
				paginationUrl: '/projects/ABCD1234/application-documents?page=:page',
				projectName: 'St James Barton Giant Wind Turbine',
				baseUrl: '/projects/ABCD1234',
				caseRef: 'ABCD1234',
				documents: [],
				hideProjectInformationLink,
				hideAllExaminationDocumentsLink,
				hideRecommendationAndDecisionLink,
				hideExaminationTimetableLink,
				queryUrl: '',
				searchTerm: undefined,
				modifiedStageFilters: modifiedStageFiltersValue,
				modifiedCategoryFilters: [],
				modifiedTypeFilters: [],
				pageOptions: [1],
				pageUrl: '/projects/ABCD1234/application-documents',
				paginationData: {
					currentPage: 1,
					fromRange: 1,
					itemsPerPage: 20,
					toRange: 1,
					totalItems: 1,
					totalPages: 1
				}
			});
		});
		it('should handle a category filter and count list', async () => {
			searchDocumentListV2.mockImplementation(() =>
				Promise.resolve({
					resp_code: 200,
					data: {
						documents: [],
						filters: {
							stageFilters: [],
							typeFilters: [],
							categoryFilters: [
								{
									name: 'Application Document',
									count: 258
								}
							]
						},
						totalItems: 1,
						itemsPerPage: 20,
						totalPages: 1,
						currentPage: 1
					}
				})
			);
			await aboutTheApplicationController.getApplicationDocuments(req, res);
			expect(res.render).toHaveBeenCalledWith(VIEW.PROJECTS.DOCUMENTS, {
				paginationUrl: '/projects/ABCD1234/application-documents?page=:page',
				projectName: 'St James Barton Giant Wind Turbine',
				baseUrl: '/projects/ABCD1234',
				caseRef: 'ABCD1234',
				documents: [],
				hideProjectInformationLink,
				hideAllExaminationDocumentsLink,
				hideRecommendationAndDecisionLink,
				hideExaminationTimetableLink,
				queryUrl: '',
				searchTerm: undefined,
				modifiedStageFilters: modifiedStageFiltersValue,
				modifiedCategoryFilters: [
					{
						checked: false,
						text: 'Application Document (258)',
						value: 'Application Document'
					}
				],
				modifiedTypeFilters: [],
				pageOptions: [1],
				pageUrl: '/projects/ABCD1234/application-documents',
				paginationData: {
					currentPage: 1,
					fromRange: 1,
					itemsPerPage: 20,
					toRange: 1,
					totalItems: 1,
					totalPages: 1
				}
			});
		});
	});
});
