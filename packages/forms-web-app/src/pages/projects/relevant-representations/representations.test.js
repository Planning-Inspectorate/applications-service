const controller = require('./representations');
const { getProjectData, searchRepresentations } = require('../../../lib/application-api-wrapper');
const { getRepresentation } = require('../../../services/representation.service');
const { featureHideLink } = require('../../../config');

const { hideAllExaminationDocumentsLink } = featureHideLink;

jest.mock('../../../lib/application-api-wrapper');
jest.mock('../../../services/representation.service');

describe('pages/projects/relevant-representations/representations', () => {
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
		res = {
			locals: {
				applicationData: {
					projectName: 'mock project name'
				}
			},
			render: jest.fn()
		};
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
			DateRRepAppearOnWebsite: '2020-01-01',
			DoNotPublish: null,
			Attachments: 'WS010006-000002',
			attachments: []
		}
	];

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
				allowProjectInformation: true,
				caseRef: 'EN010009',
				commentsTypeFilterItems: [],
				hideAllExaminationDocumentsLink: true,
				pageOptions: [1],
				paginationData: {
					currentPage: 1,
					fromRange: 1,
					itemsPerPage: 20,
					toRange: 1,
					totalItems: 1,
					totalPages: 1
				},
				paginationQueryString: '?page=:page',
				projectName: 'mock project name',
				querySearchOrTypePresent: false,
				representations: [
					{
						AgentOrgOnBhalfContactName: null,
						Attachments: 'WS010006-000002',
						CaseReference: 'EN010009',
						CompulsoryAcquisitionHearing: null,
						DataID: null,
						DateRRepAppearOnWebsite: '2020-01-01',
						DateRrepReceived: '19 February 2020',
						DoNotPublish: null,
						ID: 2,
						IndvdlOnBhalfName: null,
						InterestInLand: null,
						IssuesSpecificHearings: null,
						OpenFloorHearings: null,
						OrgOnBhalfName: null,
						PersonalName: 'Test (Test)',
						PreliminaryMeeting: null,
						ProjectName: 'SPT Feb 2020',
						RelevantOrNot: null,
						RepFrom: 'Members of the public/businesses',
						RepresentationOriginal: null,
						RepresentationRedacted: 'Some comments',
						Representative: null,
						SpecifyOther: null,
						SubmitFurtherWrittenReps: null,
						UniqueReference: 'WS010006-34601',
						WebReference: null,
						attachments: []
					}
				],
				resultsPerPage: {
					fifty: { active: false, link: '?itemsPerPage=50', size: 50 },
					oneHundred: { active: false, link: '?itemsPerPage=100', size: 100 },
					twentyFive: { active: true, link: '?itemsPerPage=25', size: 25 }
				},
				searchTerm: undefined,
				showReps: false
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
				allowProjectInformation: true,
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
