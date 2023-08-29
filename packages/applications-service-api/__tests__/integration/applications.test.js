const { APPLICATION_DB, APPLICATION_FO } = require('../__data__/application');
const { request } = require('../__data__/supertest');

const mockFindUnique = jest.fn();
const mockFindAll = jest.fn();
const mockCount = jest.fn();
jest.mock('../../src/lib/prisma', () => ({
	prismaClient: {
		project: {
			findUnique: (query) => mockFindUnique(query)
		}
	}
}));

jest.mock('../../src/models', () => ({
	Project: {
		findAll: (query) => mockFindAll(query),
		count: () => mockCount()
	}
}));

describe('/api/v1/applications', () => {
	describe('get single application', () => {
		afterEach(() => mockFindUnique.mockClear());

		describe('Back Office case', () => {
			it('given case with caseReference exists, returns 200', async () => {
				mockFindUnique.mockResolvedValueOnce(APPLICATION_DB);

				const response = await request.get('/api/v1/applications/EN0110004');

				expect(response.status).toEqual(200);
				expect(response.body).toEqual({
					AnticipatedDateOfSubmission: '2023-09-01 00:00:00.0000000',
					AnticipatedGridRefEasting: 485899,
					AnticipatedGridRefNorthing: 414508,
					AnticipatedSubmissionDateNonSpecific: 'Q3 2023',
					ApplicantEmailAddress: 'TBC',
					ApplicantPhoneNumber: 'TBC',
					CaseReference: 'EN0110004',
					ConfirmedDateOfDecision: null,
					ConfirmedStartOfExamination: null,
					DateOfDCOAcceptance_NonAcceptance: null,
					DateOfDCOSubmission: null,
					DateOfPreliminaryMeeting: null,
					DateOfRecommendations: null,
					DateOfRelevantRepresentationClose: null,
					DateOfRepresentationPeriodOpen: null,
					DateProjectWithdrawn: null,
					DateRRepAppearOnWebsite: null,
					DateTimeExaminationEnds: null,
					LongLat: [-0.7028315466694124, 53.620079146110655],
					MapZoomLevel: 6,
					ProjectEmailAddress: 'drax.project.email@example.org',
					ProjectLocation: 'Drax Power Station, North Yorkshire',
					ProjectName: 'Drax Bioenergy with Carbon Capture and Storage Project',
					PromoterFirstName: 'TBC',
					PromoterLastName: 'TBC',
					PromoterName: 'TBC',
					Proposal: 'EN01 - Generating Stations',
					Region: 'yorkshire_and_the_humber',
					Stage: 1,
					Stage4ExtensiontoExamCloseDate: null,
					Stage5ExtensiontoDecisionDeadline: null,
					Summary:
						'Drax Power Limited proposes to install post-combustion capture technology that would capture carbon dioxide emissions from up to two of the existing biomass units at Drax Power Station. The proposal includes the construction and operation of carbon capture technology and associated equipment, and the integration of the units into the existing Common Services at Drax Power Station. The proposal includes associated development.',
					WebAddress: 'TBC',
					sourceSystem: 'ODT',
					stage5ExtensionToRecommendationDeadline: null
				});
			});

			it('returns 400 if caseReference is in invalid format', async () => {
				const response = await request.get('/api/v1/applications/bad_format');

				expect(response.status).toEqual(400);
				expect(response.body).toEqual({
					code: 400,
					errors: ['\'caseReference\' must match pattern "^[A-Za-z]{2}\\d{6,8}$"']
				});
			});
		});
	});
	describe('get all applications', () => {
		it('happy path', async () => {
			mockFindAll.mockResolvedValueOnce([{ dataValues: APPLICATION_FO }]);
			mockCount.mockResolvedValueOnce(1);

			const response = await request.get('/api/v1/applications');

			expect(response.status).toEqual(200);
			expect(response.body).toEqual({
				applications: [
					{
						...APPLICATION_FO,
						LatLong: undefined,
						LongLat: APPLICATION_FO.LatLong.split(',').reverse(),
						MapZoomLevel: 6
					}
				],
				currentPage: 1,
				itemsPerPage: 25,
				totalItems: 1,
				totalPages: 1
			});
		});
	});
});
