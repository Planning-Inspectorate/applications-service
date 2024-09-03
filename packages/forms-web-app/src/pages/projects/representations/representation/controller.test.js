const { getRepresentationController } = require('./controller');

const {
	getProjectData,
	getRepresentationById
} = require('../../../../lib/application-api-wrapper');

jest.mock('../../../../lib/application-api-wrapper');

describe('pages/projects/representations/representation/controller', () => {
	let req;
	let res;

	const caseRef = 'EN010009';

	beforeEach(() => {
		jest.resetAllMocks();
		req = {
			i18n: {
				language: 'en'
			},
			params: {
				case_ref: caseRef
			},
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
			Representative: 'a representative',
			IndvdlOnBhalfName: null,
			OrgOnBhalfName: null,
			AgentOrgOnBhalfContactName: null,
			RepFrom: 'Members of the public/businesses',
			RepFromWelsh: 'Welsh members of the public/businesses',
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

	describe('#getRepresentationController', () => {
		describe('When getting the representation page', () => {
			describe('and there are no issues', () => {
				beforeEach(async () => {
					getProjectData.mockImplementation((applicationCaseRef) =>
						Promise.resolve({
							resp_code: 200,
							data: { CaseReference: applicationCaseRef, ProjectName: 'ABC' }
						})
					);
					getRepresentationById.mockImplementation(() =>
						Promise.resolve({
							data: { ...representations[0] }
						})
					);
					await getRepresentationController(req, res);
				});
				it('should getRepresentation and return the correct template', async () => {
					expect(res.render).toHaveBeenCalledWith(
						'projects/representations/representation/view.njk',
						{
							langIsWelsh: false,
							allowProjectInformation: true,
							backToListUrl: '/projects/EN010009/representations',
							projectName: 'ABC',
							projectNameWelsh: undefined,
							representation: {
								URL: '/projects/:case_ref/representations/2',
								attachments: [],
								comment: 'Some comments',
								formattedComment: '<p>Some comments</p>',
								dateSubmitted: '19 February 2020',
								hasAttachments: true,
								name: 'Test (Test)',
								representative: 'a representative',
								submittedBy: 'Members of the public/businesses',
								submittedByWelsh: 'Welsh members of the public/businesses'
							}
						}
					);
				});
			});
		});
	});
});
