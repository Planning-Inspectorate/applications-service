const controller = require('../../../../src/controllers/projects/representations');
const {
	getProjectData,
	searchRepresentations
} = require('../../../../src/lib/application-api-wrapper');
const { mockReq, mockRes } = require('../../mocks');
const { VIEW } = require('../../../../src/lib/views');
const { getRepresentation } = require('../../../../src/services/representation.service');

jest.mock('../../../../src/lib/application-api-wrapper');
jest.mock('../../../../src/services/representation.service');

describe('controllers/projects/representations', () => {
	let req;
	let res;

	const caseRef = 'EN010009';

	beforeEach(() => {
		jest.resetAllMocks();
		req = {
			...mockReq(),
			params: {
				case_ref: caseRef
			},
			query: {
				page: '1'
			}
		};
		res = mockRes();
	});

	const representations = [
		{
			ID: 2,
			ProjectName: 'SPT Feb 2020',
			CaseReference: caseRef,
			DataID: null,
			UniqueReference: 'WS010006-34601',
			WebReference: null,
			PersonalName: 'Test (Test)',
			Representative: null,
			IndvdlOnBhalfName: null,
			OrgOnBhalfName: null,
			AgentOrgOnBhalfContactName: null,
			RepFrom: 'Members of the Public/Businesses',
			InterestInLand: null,
			SpecifyOther: null,
			CompulsoryAcquisitionHearing: null,
			RepresentationOriginal: null,
			RepresentationRedacted: 'Some comments',
			RelevantOrNot: null,
			SubmitFurtherWrittenReps: null,
			PreliminaryMeeting: null,
			OpenFloorHearings: null,
			IssuesSpecificHearings: null,
			DateRrepReceived: '2020-02-19T00:00:00.000Z',
			DoNotPublish: null,
			Attachments: 'WS010006-000002',
			attachments: []
		}
	];

	const paginationData = {
		totalItems: 1,
		itemsPerPage: 20,
		totalPages: 1,
		currentPage: 1,
		fromRange: 1,
		toRange: 1
	};

	const pageOptions = [1];

	it('should getRepresentations and return the correct template', async () => {
		getProjectData.mockImplementation((applicationCaseRef) =>
			Promise.resolve({
				resp_code: 200,
				data: { CaseReference: applicationCaseRef, ProjectName: 'ABC' }
			})
		);
		searchRepresentations.mockImplementation(() =>
			Promise.resolve({
				resp_code: 200,
				data: {
					representations,
					filters: {
						typeFilters: []
					},
					totalItems: 1,
					itemsPerPage: 20,
					totalPages: 1,
					currentPage: 1
				}
			})
		);
		await controller.getRepresentations(req, res);
		expect(res.render).toHaveBeenCalledWith(VIEW.PROJECTS.REPRESENTATIONS, {
			projectName: 'ABC',
			caseRef,
			representations,
			paginationData,
			pageOptions,
			searchTerm: undefined,
			queryUrl: '',
			commentsTypeFilterItems: []
		});
	});

	it('should getRepresentation and return the correct template', async () => {
		getProjectData.mockImplementation((applicationCaseRef) =>
			Promise.resolve({
				resp_code: 200,
				data: { CaseReference: applicationCaseRef, ProjectName: 'ABC' }
			})
		);
		getRepresentation.mockImplementation(() =>
			Promise.resolve({
				data: { ...representations[0] }
			})
		);
		await controller.getRepresentation(req, res);
		expect(res.render).toHaveBeenCalledWith(VIEW.PROJECTS.REPRESENTATION, {
			projectName: 'ABC',
			caseRef,
			RepFrom: 'Members of the Public/Businesses',
			RepresentationRedacted: 'Some comments',
			DateRrepReceived: '19 February 2020',
			attachments: []
		});
	});
});
