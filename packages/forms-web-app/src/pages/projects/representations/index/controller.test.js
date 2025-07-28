const {
	getRepresentationsIndexController,
	postRepresentationsIndexController
} = require('./controller');

const {
	getProjectData,
	searchRepresentations
} = require('../../../../lib/application-api-wrapper');

jest.mock('../../../../lib/application-api-wrapper');

describe('pages/projects/representations/index/controller', () => {
	describe('#getRepresentationsIndexController', () => {
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
				Representative: null,
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
			await getRepresentationsIndexController(req, res);

			expect(res.render).toHaveBeenCalledWith('projects/representations/index/view.njk', {
				langIsWelsh: false,
				activeFilters: [],
				allowProjectInformation: true,
				caseRef: 'EN010009',
				filterNameID: 'type',
				filters: [],
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
				relevantRepresentationsURL: '/projects/EN010009/representations',
				representations: [
					{
						URL: '/projects/EN010009/representations/2',
						attachments: [],
						comment: 'Some comments',
						formattedComment: '<p>Some comments</p>',
						dateSubmitted: '19 February 2020',
						hasAttachments: true,
						name: 'Test (Test)',
						representative: null,
						submittedBy: 'Members of the public/businesses',
						submittedByWelsh: 'Welsh members of the public/businesses'
					}
				],
				resultsPerPage: {
					fifty: { active: false, link: '?itemsPerPage=50', size: 50 },
					oneHundred: { active: false, link: '?itemsPerPage=100', size: 100 },
					twentyFive: { active: true, link: '?itemsPerPage=25', size: 25 }
				},
				searchTerm: undefined,
				showRepresentations: false,
				resultsNotFound: false,
				hasNoResultsPostDecision: false
			});
		});
	});

	describe('#postRepresentationsIndexController', () => {
		describe('When submitting selected filters on a representations page', () => {
			const req = {
				body: { 'mock-filter-1': 'mock filter value' },
				params: { case_ref: 'mock-case-ref' }
			};
			const res = {
				redirect: jest.fn()
			};

			beforeEach(async () => {
				await postRepresentationsIndexController(req, res);
			});
			it('should trigger a redirect', () => {
				expect(res.redirect).toHaveBeenCalledTimes(1);
			});
			it('should redirect back to documents page with correctly constructed query string from the request body', () => {
				expect(res.redirect).toHaveBeenCalledWith(
					'/projects/mock-case-ref/representations?mock-filter-1=mock%20filter%20value'
				);
			});
		});
	});
});
