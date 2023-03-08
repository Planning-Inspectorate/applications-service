const controller = require('./representations');
const { getProjectData, searchRepresentations } = require('../../../lib/application-api-wrapper');
const { getRepresentation } = require('../../../services/representation.service');
const { featureHideLink } = require('../../../config');

const { hideProjectInformationLink, hideAllExaminationDocumentsLink } = featureHideLink;

jest.mock('../../../lib/application-api-wrapper');
jest.mock('../../../services/representation.service');

describe('controllers/projects/representations', () => {
	let req;
	let res;

	const caseRef = 'EN010009';

	beforeEach(() => {
		jest.resetAllMocks();
		req = {
			params: {
				case_ref: caseRef
			},
			get: jest.fn(),
			query: {
				page: '1'
			}
		};
		res = { render: jest.fn() };
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
			RepFrom: 'Members of the public/businesses',
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
		expect(res.render).toHaveBeenCalledWith(
			'projects/relevant-representations/representations.njk',
			{
				projectName: 'ABC',
				caseRef,
				representations,
				paginationData,
				pageOptions,
				searchTerm: undefined,
				queryUrl: '',
				commentsTypeFilterItems: [],
				hideProjectInformationLink,
				hideAllExaminationDocumentsLink
			}
		);
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
		expect(req.get).toHaveBeenCalledWith('Referrer');
		expect(res.render).toHaveBeenCalledWith(
			'projects/relevant-representations/representation.njk',
			{
				projectName: 'ABC',
				caseRef,
				hideProjectInformationLink,
				hideAllExaminationDocumentsLink,
				RepFrom: 'Members of the public/businesses',
				PersonalName: 'Test (Test)',
				RepresentationRedacted: 'Some comments',
				DateRrepReceived: '19 February 2020',
				attachments: []
			}
		);
	});
});
